/**
 * The library catalog side of a made-up item: its catalog entry (which gives it a library page and
 * a place for its picture), and a background job that paints the picture in the house item style.
 * The item's data is saved before the job starts, so a slow or failed painting never holds it up.
 */
import { execFile, spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { copyFile, mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

import { runCodex } from './dm-authoring.ts'

const ROOT = process.cwd()
const CATALOG = path.join(ROOT, 'src/lib/published-library-catalog/entries.json')
const IMAGE_SOURCES = path.join(ROOT, 'scripts/library-image-sources.json')
const PAINT_TIMEOUT_MS = 10 * 60_000

type CatalogArt = { file: string; credit: string }
type CatalogEntry = {
  type: string
  slug: string
  name: string
  art?: CatalogArt[]
  [field: string]: unknown
}

function run(command: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd: ROOT, stdio: 'ignore' })
    child.on('error', reject)
    child.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} failed`)),
    )
  })
}

/** Writes JSON the way the repository formats it: two-space JSON, then oxfmt. */
async function writeJson(file: string, value: unknown) {
  const temporary = file.replace(/\.json$/u, `.${process.pid}.tmp.json`)
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`)
  await run('bunx', ['oxfmt', temporary])
  await rename(temporary, file)
}

const slugOf = (key: string) => key.replaceAll('_', '-')

/** The plain words of an entry's first paragraph, for the catalog's one-line summary. */
function summaryOf(text: unknown): string {
  const first = Array.isArray(text) && Array.isArray(text[0]) ? (text[0] as unknown[]) : []
  return first
    .filter((atom): atom is string => typeof atom === 'string')
    .join('')
    .trim()
}

export type MadeItem = {
  kind: 'equipment' | 'magicItem'
  key: string
  entry: Record<string, unknown>
  /** The kind of shop it was made for, e.g. `Confectioner`: its catalog group. */
  group: string
}

/** Adds the item to the library catalog, typed to its entry in the campaign's own book. */
export async function addCatalogEntry({ kind, key, entry, group }: MadeItem) {
  const catalog = JSON.parse(await readFile(CATALOG, 'utf8')) as CatalogEntry[]
  const slug = slugOf(key)
  if (catalog.some((record) => record.type === 'items' && record.slug === slug))
    throw new Error(`The library catalog already has an item called ${slug}`)
  const publication = { ref: 'publication', key: 'the_lost_hope' }
  const price = entry.price as { amount: number; coin: string } | undefined
  catalog.push({
    type: 'items',
    slug,
    name: String(entry.name),
    group,
    groups: [group],
    summary: summaryOf(entry.text),
    ...(price ? { price: `${price.amount} ${price.coin}` } : {}),
    printings: [
      {
        id: 'original',
        label: 'Shop stock',
        gm: [],
        typed: { [kind]: { ref: kind, key }, publication },
        publication,
      },
    ],
  })
  await writeJson(CATALOG, catalog)
}

/** A picture's responsive sizes, as `src/generated/library-responsive-images.ts` holds them. */
export type ResponsiveSizes = Record<string, unknown>

type ArtJob =
  | { state: 'painting' }
  | { state: 'done'; picture: string; sizes?: ResponsiveSizes }
  | { state: 'failed'; error: string }

/** Painting jobs by item key. They live on `globalThis` so a dev server restart keeps them. */
export const itemArtJobs: Map<string, ArtJob> = ((
  globalThis as { theLostHopeItemArtJobs?: Map<string, ArtJob> }
).theLostHopeItemArtJobs ??= new Map())

type ArtStyleBrief = { guide: string[]; references: { file: string; present: boolean }[] }

async function itemStyle(): Promise<ArtStyleBrief> {
  const { stdout } = await promisify(execFile)('bun', ['scripts/art-style.ts', 'item', '--json'], {
    cwd: ROOT,
  })
  return JSON.parse(stdout) as ArtStyleBrief
}

/** Width and height from a PNG's IHDR chunk. */
function pngSize(bytes: Buffer) {
  if (bytes.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') return undefined
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) }
}

/** Registers the painted picture and points the catalog entry at it. */
async function installPicture(slug: string, png: string) {
  const size = pngSize(await readFile(png))
  if (!size) throw new Error('Codex did not produce a PNG')
  if (size.width !== size.height) throw new Error(`It is ${size.width}×${size.height}, not square`)

  const repositoryPath = `assets/images/content/library-release/items/${slug}.png`
  const logicalSource = `/assets/library/items/${slug}.png`
  await mkdir(path.join(ROOT, path.dirname(repositoryPath)), { recursive: true })
  await copyFile(png, path.join(ROOT, repositoryPath))

  const sources = JSON.parse(await readFile(IMAGE_SOURCES, 'utf8')) as { logicalSource: string }[]
  if (!sources.some((source) => source.logicalSource === logicalSource)) {
    const id = `library-${createHash('sha256').update(logicalSource).digest('hex').slice(0, 20)}`
    await writeJson(IMAGE_SOURCES, [...sources, { id, logicalSource, repositoryPath }])
  }
  // Upload first: generation refuses an original that differs from the lock.
  await run('bun', ['scripts/media-sync.ts']).catch(() => {
    throw new Error('The picture is saved, but uploading it failed. Run `bun run media:sync`.')
  })
  await run('bun', ['scripts/generate-responsive-images.ts'])

  // The catalog changes last, so the page asks for the picture only once its sizes exist.
  const catalog = JSON.parse(await readFile(CATALOG, 'utf8')) as CatalogEntry[]
  const record = catalog.find((entry) => entry.type === 'items' && entry.slug === slug)
  if (!record) throw new Error(`The catalog lost ${slug}`)
  record.art = [{ file: logicalSource, credit: 'OpenAI ImageGen' }]
  await writeJson(CATALOG, catalog)
  return { picture: logicalSource, sizes: await responsiveSizes(logicalSource) }
}

/**
 * A new picture's responsive sizes, read from the generated module. An open page loaded the sizes
 * before the picture existed, so the server hands them over with the finished job.
 */
async function responsiveSizes(source: string): Promise<ResponsiveSizes | undefined> {
  const text = await readFile(path.join(ROOT, 'src/generated/library-responsive-images.ts'), 'utf8')
  const start = text.indexOf('{', text.indexOf('GENERATED_LIBRARY_RESPONSIVE_IMAGES'))
  const end = text.lastIndexOf('} as const')
  if (start === -1 || end === -1) return undefined
  const all = JSON.parse(text.slice(start, end + 1)) as Record<string, ResponsiveSizes>
  return all[source]
}

/**
 * Paints the item's picture in the background. Codex works in a scratch folder that holds only
 * copies of the style's reference pictures, so the write-enabled run cannot touch the checkout;
 * `exclusive` serialises the install with other writes to the same files.
 */
export function paintItem(
  item: { key: string; name: string; description: string },
  exclusive: <T>(task: () => Promise<T>) => Promise<T>,
) {
  if (itemArtJobs.get(item.key)?.state === 'painting') return
  itemArtJobs.set(item.key, { state: 'painting' })
  const slug = slugOf(item.key)
  void (async () => {
    const scratch = await mkdtemp(path.join(tmpdir(), 'item-art-'))
    try {
      const style = await itemStyle()
      const references = style.references
        .filter(({ present }) => present)
        .map(({ file }, index) => ({ file, name: `reference-${index + 1}${path.extname(file)}` }))
      await Promise.all(
        references.map(({ file, name }) => copyFile(file, path.join(scratch, name))),
      )
      await runCodex({
        cwd: scratch,
        sandbox: 'workspace-write',
        timeoutMs: PAINT_TIMEOUT_MS,
        prompt: [
          `Generate a square picture of ${item.name}, an item in a fantasy campaign, with your built-in image generation tool.`,
          `What it is: ${item.description}`,
          `Match the painted style of the reference pictures in this folder (${references.map(({ name }) => name).join(', ')}). Copy their look, not their subjects.`,
          'House style:',
          ...style.guide.map((line) => `- ${line}`),
          'Save exactly one square PNG named item.png in this folder.',
        ].join('\n'),
      })
      const out = path.join(scratch, 'item.png')
      if (!existsSync(out)) throw new Error('Codex finished without saving the picture')
      const kept = path.join(ROOT, 'output/imagegen/items', `${slug}.png`)
      await mkdir(path.dirname(kept), { recursive: true })
      await copyFile(out, kept)
      const installed = await exclusive(() => installPicture(slug, kept))
      itemArtJobs.set(item.key, { state: 'done', ...installed })
    } catch (error) {
      itemArtJobs.set(item.key, { state: 'failed', error: (error as Error).message })
    } finally {
      await rm(scratch, { recursive: true, force: true })
    }
  })()
}
