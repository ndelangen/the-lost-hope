/**
 * Original artwork lives in Cloudflare R2, not git. `assets/images.lock.json` records each
 * registered original by content, and every checkout materialises the files from a store shared
 * by all worktrees of the repository. See AGENTS.md, "Original artwork".
 */
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { constants, existsSync } from 'node:fs'
import { copyFile, mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises'
import { availableParallelism } from 'node:os'
import { dirname, extname, join } from 'node:path'

import { RESPONSIVE_IMAGE_SOURCES } from '../image-sources.ts'

export const ROOT = process.cwd()
export const LOCK_PATH = 'assets/images.lock.json'
export const MEDIA_BUCKET = 'thelosthope-media-src'
export const MEDIA_ORIGIN =
  process.env.MEDIA_ORIGIN ?? 'https://pub-47d3ac413b184802801be1b2ae9de92d.r2.dev'

export type LockEntry = { sha256: string; bytes: number }
export type Lock = Record<string, LockEntry>

/** Every registered original, in registry order. */
export const registeredPaths = (): string[] => [
  ...new Set(RESPONSIVE_IMAGE_SOURCES.map((source) => source.repositoryPath)),
]

/** Raster files that belong in R2 rather than git; `assets/images/app/` icons stay in git. */
export const isOriginalRaster = (path: string): boolean =>
  path.startsWith('assets/images/') &&
  !path.startsWith('assets/images/app/') &&
  /\.(png|jpe?g|webp)$/i.test(path)

export const objectKey = (path: string, sha256: string): string =>
  `originals/${sha256}${extname(path).toLowerCase()}`

export const objectUrl = (path: string, sha256: string): string =>
  `${MEDIA_ORIGIN}/${objectKey(path, sha256)}`

export function contentType(path: string): string {
  const extension = extname(path).toLowerCase()
  if (extension === '.png') return 'image/png'
  if (extension === '.webp') return 'image/webp'
  return 'image/jpeg'
}

export const sha256 = (bytes: Uint8Array): string =>
  createHash('sha256').update(bytes).digest('hex')

function parseLock(text: string, source: string): Lock {
  try {
    return JSON.parse(text) as Lock
  } catch {
    throw new Error(
      `${source} is not valid JSON. Run \`bun run media:sync\` to resolve a conflict.`,
    )
  }
}

export async function readLock(): Promise<Lock> {
  const path = join(ROOT, LOCK_PATH)
  if (!existsSync(path)) return {}
  return parseLock(await readFile(path, 'utf8'), LOCK_PATH)
}

/** One sorted entry per line, so branches that add different images merge cleanly. */
export function serializeLock(lock: Lock): string {
  const lines = Object.keys(lock)
    .toSorted()
    .map((key) => `  ${JSON.stringify(key)}: ${JSON.stringify(lock[key])}`)
  return lines.length === 0 ? '{}\n' : `{\n${lines.join(',\n')}\n}\n`
}

export async function writeLock(lock: Lock): Promise<void> {
  await writeFile(join(ROOT, LOCK_PATH), serializeLock(lock))
}

const git = (...args: string[]): string =>
  execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })

/**
 * Resolves a lock left conflicted by a merge: keeps every entry from both sides, and fails only
 * when the same path names two different images, which a person has to choose between.
 */
export async function resolveConflictedLock(): Promise<boolean> {
  const path = join(ROOT, LOCK_PATH)
  if (!existsSync(path) || !(await readFile(path, 'utf8')).includes('<<<<<<<')) return false
  const ours = parseLock(git('show', `:2:${LOCK_PATH}`), `our ${LOCK_PATH}`)
  const theirs = parseLock(git('show', `:3:${LOCK_PATH}`), `their ${LOCK_PATH}`)
  const clashes = Object.keys(theirs).filter(
    (key) => ours[key] && ours[key].sha256 !== theirs[key].sha256,
  )
  if (clashes.length > 0) {
    throw new Error(
      `Both branches changed these images differently; keep one file on disk, delete its line from ${LOCK_PATH} on one side, and run media:sync again:\n${clashes.map((key) => `  ${key}`).join('\n')}`,
    )
  }
  await writeLock({ ...ours, ...theirs })
  git('add', LOCK_PATH)
  return true
}

function gitPath(flag: '--git-common-dir' | '--git-dir'): string | undefined {
  try {
    return git('rev-parse', '--path-format=absolute', flag).trim()
  } catch {
    return undefined
  }
}

/** One content-addressed copy of every original, shared by all worktrees of this repository. */
const STORE = join(
  gitPath('--git-common-dir') ?? join(ROOT, 'node_modules/.cache'),
  'media-originals',
)

/** What this checkout last synced, to tell a stale file from one edited locally. */
const SYNCED_PATH = join(
  gitPath('--git-dir') ?? join(ROOT, 'node_modules/.cache'),
  'media-synced.json',
)

type SyncedRecord = Record<string, { sha256: string; bytes: number; mtimeMs: number }>

async function readSynced(): Promise<SyncedRecord> {
  try {
    return JSON.parse(await readFile(SYNCED_PATH, 'utf8')) as SyncedRecord
  } catch {
    return {}
  }
}

async function writeSynced(record: SyncedRecord): Promise<void> {
  await mkdir(dirname(SYNCED_PATH), { recursive: true })
  await writeFile(SYNCED_PATH, JSON.stringify(record))
}

const storePath = (hash: string): string => join(STORE, hash)

/** Writes through a temporary name so an interrupted run never leaves a partial file. */
async function atomicCopy(from: string, to: string): Promise<void> {
  await mkdir(dirname(to), { recursive: true })
  const temporary = `${to}.${process.pid}.partial`
  // An APFS clone where the filesystem supports it, so each checkout's copy costs no disk space.
  await copyFile(from, temporary, constants.COPYFILE_FICLONE)
  await rename(temporary, to)
}

async function atomicWrite(to: string, bytes: Uint8Array): Promise<void> {
  await mkdir(dirname(to), { recursive: true })
  const temporary = `${to}.${process.pid}.partial`
  await writeFile(temporary, bytes)
  await rename(temporary, to)
}

/** Adds a file already on disk to the shared store. */
export async function storeFile(path: string, hash: string): Promise<string> {
  const stored = storePath(hash)
  if (!existsSync(stored)) await atomicCopy(join(ROOT, path), stored)
  return stored
}

/** Makes sure the shared store holds an original, downloading it from R2 when it does not. */
async function ensureStored(path: string, entry: LockEntry): Promise<string> {
  const stored = storePath(entry.sha256)
  if (existsSync(stored)) return stored
  const response = await fetch(objectUrl(path, entry.sha256))
  if (!response.ok) throw new Error(`${response.status} from ${objectUrl(path, entry.sha256)}`)
  const bytes = new Uint8Array(await response.arrayBuffer())
  if (sha256(bytes) !== entry.sha256) throw new Error(`downloaded bytes do not match the lock`)
  await atomicWrite(stored, bytes)
  return stored
}

type FileState = { sha256: string; bytes: number; mtimeMs: number }

/** Hashes a file, trusting this checkout's record when size and modification time are unchanged. */
async function fileState(path: string, synced: SyncedRecord): Promise<FileState | undefined> {
  const absolute = join(ROOT, path)
  const info = await stat(absolute).catch(() => undefined)
  if (!info) return undefined
  const known = synced[path]
  if (known && known.bytes === info.size && known.mtimeMs === info.mtimeMs) return known
  const bytes = await readFile(absolute)
  return { sha256: sha256(bytes), bytes: info.size, mtimeMs: info.mtimeMs }
}

export async function hashFile(path: string): Promise<LockEntry> {
  const bytes = await readFile(join(ROOT, path))
  return { sha256: sha256(bytes), bytes: bytes.byteLength }
}

export async function eachLimited<T>(items: readonly T[], work: (item: T) => Promise<void>) {
  let next = 0
  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const item = items[next++]
      // oxlint-disable-next-line no-await-in-loop -- bounded workers keep memory and sockets in check
      await work(item)
    }
  }
  await Promise.all(Array.from({ length: Math.min(8, availableParallelism()) }, worker))
}

export type PullResult = { restored: string[]; edited: string[]; failed: string[] }

/**
 * Brings this checkout's originals in line with the lock. A missing file, or a stale one (still
 * the version this checkout last synced while the lock names newer art), is replaced from the
 * shared store, which downloads from R2 only what it lacks. A file edited locally is never
 * overwritten: it is reported, and `media:sync` uploads it.
 */
export async function pullOriginals(): Promise<PullResult> {
  const lock = await readLock()
  const synced = await readSynced()
  const result: PullResult = { restored: [], edited: [], failed: [] }

  await eachLimited(Object.keys(lock), async (path) => {
    const entry = lock[path]
    try {
      const current = await fileState(path, synced)
      if (current?.sha256 === entry.sha256) {
        synced[path] = current
        await storeFile(path, entry.sha256)
        return
      }
      if (current && synced[path]?.sha256 !== current.sha256) {
        result.edited.push(path)
        return
      }
      await atomicCopy(await ensureStored(path, entry), join(ROOT, path))
      const info = await stat(join(ROOT, path))
      synced[path] = { ...entry, mtimeMs: info.mtimeMs }
      result.restored.push(path)
    } catch (error) {
      result.failed.push(`${path}: ${(error as Error).message}`)
    }
  })

  await writeSynced(synced)
  return result
}

/** Records files this checkout just uploaded, so a later pull treats them as synced. */
export async function recordSynced(paths: readonly string[]): Promise<void> {
  const synced = await readSynced()
  await eachLimited(paths, async (path) => {
    const info = await stat(join(ROOT, path))
    const { sha256: hash, bytes } = await hashFile(path)
    synced[path] = { sha256: hash, bytes, mtimeMs: info.mtimeMs }
  })
  await writeSynced(synced)
}

/**
 * The automatic half, run before images are generated: fetches what is missing and refuses to
 * continue while any registered original is absent or differs from the lock, so stale art can
 * never be built or shipped.
 */
export async function requireOriginals(): Promise<void> {
  const lock = await readLock()
  const { restored, edited, failed } = await pullOriginals()
  if (restored.length > 0) console.log(`Fetched ${restored.length} originals into this checkout`)

  const unlocked = registeredPaths().filter((path) => !lock[path])
  const problems = [
    ...failed.map((line) => `  could not fetch ${line}`),
    ...edited.map((path) => `  ${path} differs from ${LOCK_PATH}`),
    ...unlocked
      .filter((path) => !existsSync(join(ROOT, path)))
      .map((path) => `  ${path} is registered but has no file and no lock entry`),
  ]
  if (problems.length > 0) {
    throw new Error(
      `Original artwork is not in step with ${LOCK_PATH}:\n${problems.join('\n')}\nOn the Mac, \`bun run media:sync\` uploads new or edited art. To take the locked version instead, delete the local file.`,
    )
  }
  if (unlocked.length > 0) {
    console.warn(
      `${unlocked.length} registered originals are not uploaded yet; run \`bun run media:sync\` on the Mac:\n${unlocked.map((path) => `  ${path}`).join('\n')}`,
    )
  }
}
