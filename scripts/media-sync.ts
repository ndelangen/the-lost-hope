/**
 * Keeps this checkout, the shared store and R2 in step with `assets/images.lock.json`.
 *
 *   bun run media:sync           fetch missing art, upload new or edited art, rewrite the lock
 *   bun run media:sync --adopt   also take art that a branch committed into git out of git
 *
 * Uploading uses the Mac's `wrangler` login. The lock is written only after every upload is
 * confirmed, so it never names an original R2 lacks. Only originals registered in
 * `scripts/image-sources.ts` are uploaded; drafts elsewhere are left alone.
 */
import { execFileSync, spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

import sharp from 'sharp'

import { RESPONSIVE_IMAGE_SOURCES } from './image-sources.ts'
import {
  type Lock,
  LOCK_PATH,
  MEDIA_BUCKET,
  ROOT,
  contentType,
  eachLimited,
  hashFile,
  isOriginalRaster,
  objectKey,
  objectUrl,
  pullOriginals,
  readLock,
  recordSynced,
  registeredPaths,
  resolveConflictedLock,
  storeFile,
  writeLock,
} from './media/originals.ts'

const adopt = process.argv.includes('--adopt')
const WRANGLER = (process.env.MEDIA_WRANGLER ?? 'bunx wrangler@4.156.0').split(' ')

if (await resolveConflictedLock()) console.log(`Merged both sides of the conflicted ${LOCK_PATH}`)

const pulled = await pullOriginals()
if (pulled.restored.length > 0) console.log(`Fetched ${pulled.restored.length} originals`)
if (pulled.failed.length > 0) {
  console.error(`Could not fetch:\n${pulled.failed.map((line) => `  ${line}`).join('\n')}`)
  process.exit(1)
}

const previous = await readLock()
const missing = registeredPaths().filter((path) => !existsSync(join(ROOT, path)))
if (missing.length > 0) {
  console.error(
    `These registered originals have no file and no upload yet:\n${missing.map((path) => `  ${path}`).join('\n')}`,
  )
  process.exit(1)
}

const lock: Lock = {}
await eachLimited(registeredPaths(), async (path) => {
  lock[path] = await hashFile(path)
})
const pending = registeredPaths().filter((path) => previous[path]?.sha256 !== lock[path].sha256)

/* Refuse art the generator would refuse, before it reaches R2 or the lock. */
const avatars = new Set(
  RESPONSIVE_IMAGE_SOURCES.filter((source) => source.role === 'avatar').map(
    (source) => source.repositoryPath,
  ),
)
const invalid: string[] = []
for (const path of pending) {
  // oxlint-disable-next-line no-await-in-loop -- a handful of new files per run
  const metadata = await sharp(join(ROOT, path))
    .metadata()
    .catch(() => undefined)
  if (!metadata?.width || !metadata.height) invalid.push(`  ${path} is not a readable image`)
  else if (avatars.has(path) && metadata.width !== metadata.height)
    invalid.push(`  ${path} is an avatar but ${metadata.width}x${metadata.height}, not square`)
}
if (invalid.length > 0) {
  console.error(`Nothing was uploaded and the lock is unchanged:\n${invalid.join('\n')}`)
  process.exit(1)
}

async function present(path: string, hash: string, bytes: number): Promise<boolean> {
  const response = await fetch(objectUrl(path, hash), { method: 'HEAD' })
  return response.ok && Number(response.headers.get('content-length')) === bytes
}

async function upload(file: string, key: string, type: string): Promise<void> {
  const [command, ...prefix] = WRANGLER
  await new Promise<void>((resolve, reject) => {
    const args = [...prefix, 'r2', 'object', 'put', `${MEDIA_BUCKET}/${key}`]
    args.push('--file', file, '--content-type', type, '--remote')
    const child = spawn(command, args, { cwd: ROOT, stdio: ['ignore', 'ignore', 'pipe'] })
    let stderr = ''
    child.stderr.on('data', (chunk: Buffer) => (stderr += chunk.toString()))
    child.on('error', reject)
    child.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(stderr.trim().split('\n').at(-1) ?? 'failed')),
    )
  })
}

/* Resolve wrangler once, so parallel uploads do not race to install it. */
if (pending.length > 0) {
  const [command, ...prefix] = WRANGLER
  execFileSync(command, [...prefix, '--version'], { cwd: ROOT, stdio: 'ignore' })
}

const failed: string[] = []
let uploaded = 0
await eachLimited(pending, async (path) => {
  const { sha256: hash, bytes } = lock[path]
  try {
    const stored = await storeFile(path, hash)
    if (!(await present(path, hash, bytes))) {
      await upload(stored, objectKey(path, hash), contentType(path))
      if (!(await present(path, hash, bytes))) throw new Error('not readable after upload')
      uploaded++
    }
  } catch (error) {
    failed.push(`  ${path}: ${(error as Error).message}`)
  }
})

if (failed.length > 0) {
  console.error(
    `Upload failed, so ${LOCK_PATH} is unchanged. Is wrangler signed in (\`bunx wrangler login\`)?\n${failed.join('\n')}`,
  )
  process.exit(1)
}

await writeLock(lock)
await recordSynced(Object.fromEntries(pending.map((path) => [path, lock[path]])))

if (adopt) {
  const tracked = execFileSync('git', ['ls-files', '-z', 'assets/images'], {
    cwd: ROOT,
    encoding: 'utf8',
  })
    .split('\0')
    .filter((path) => path && isOriginalRaster(path))
  const untracked = tracked.filter((path) => lock[path])
  if (untracked.length > 0) {
    execFileSync('git', ['rm', '--cached', '--quiet', '--', ...untracked], { cwd: ROOT })
    console.log(`Took ${untracked.length} uploaded originals out of git (the files stay on disk)`)
  }
  const unregistered = tracked.filter((path) => !lock[path])
  if (unregistered.length > 0) {
    console.warn(
      `These rasters are in git but not registered in scripts/image-sources.ts, so they were left alone:\n${unregistered.map((path) => `  ${path}`).join('\n')}`,
    )
  }
}

console.log(
  `media:sync: ${Object.keys(lock).length} originals locked, ${pending.length} new or changed, ${uploaded} uploaded`,
)
