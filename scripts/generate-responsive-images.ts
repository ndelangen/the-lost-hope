import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { availableParallelism } from 'node:os'
import { dirname, join } from 'node:path'

import pngToIco from 'png-to-ico'
import sharp, { type Metadata } from 'sharp'
/* oxlint-disable no-await-in-loop -- one worker per core keeps peak memory bounded */

import {
  APP_ICON_BACKGROUND,
  RESPONSIVE_IMAGE_ENCODING,
  RESPONSIVE_IMAGE_SOURCES,
  RESPONSIVE_IMAGE_WIDTHS,
} from './image-sources'
import { requireOriginals } from './media/originals.ts'

const ROOT = process.cwd()
const OUTPUT_DIRECTORY = join(ROOT, 'public/assets/generated-images')
const CACHE_FILE = join(ROOT, 'node_modules/.cache/responsive-images.json')
const GENERATED_MODULE = join(ROOT, 'src/generated/responsive-images.ts')
const LIBRARY_MODULE = join(ROOT, 'src/generated/library-responsive-images.ts')
const PIPELINE_VERSION = 'responsive-jpeg-v2|sharp@0.35.3|accurate-shrink'

type Candidate = {
  src: string
  width: number
  height: number
  bytes: number
}

type GeneratedImage = {
  width: number
  height: number
  quality: number
  progressive: true
  chromaSubsampling: '4:2:0'
  candidates: Candidate[]
}

function orientedDimensions(metadata: Metadata): { width: number; height: number } {
  if (!metadata.width || !metadata.height) throw new Error('Responsive image has no dimensions')
  return metadata.orientation && metadata.orientation >= 5
    ? { width: metadata.height, height: metadata.width }
    : { width: metadata.width, height: metadata.height }
}

function candidateWidths(sourceWidth: number, maxWidth?: number): number[] {
  const maximumWidth = maxWidth ?? RESPONSIVE_IMAGE_WIDTHS.at(-1) ?? sourceWidth
  const cappedWidth = Math.min(sourceWidth, maximumWidth)
  return [...RESPONSIVE_IMAGE_WIDTHS.filter((width) => width < cappedWidth), cappedWidth].filter(
    (width, index, widths) => index === 0 || width !== widths[index - 1],
  )
}

/** Candidates from the previous run, keyed by source digest, so unchanged sources are reused. */
async function readCache(): Promise<Record<string, Candidate[]>> {
  try {
    return JSON.parse(await readFile(CACHE_FILE, 'utf8')) as Record<string, Candidate[]>
  } catch {
    return {}
  }
}

async function allExist(candidates: readonly Candidate[]): Promise<boolean> {
  const present = await Promise.all(
    candidates.map((candidate) =>
      stat(join(ROOT, 'public', candidate.src)).then(
        (file) => file.size === candidate.bytes,
        () => false,
      ),
    ),
  )
  return candidates.length > 0 && present.every(Boolean)
}

type ImageSource = (typeof RESPONSIVE_IMAGE_SOURCES)[number]

type EncodedSource = { cacheKey: string; image: GeneratedImage }

/** Encodes one source's candidates, reusing the previous run's files when the source is unchanged. */
async function encodeSource(
  source: ImageSource,
  previous: Record<string, Candidate[]>,
): Promise<EncodedSource> {
  const sourceBytes = await readFile(join(ROOT, source.repositoryPath))
  const dimensions = orientedDimensions(await sharp(sourceBytes).metadata())
  if (source.role === 'avatar' && dimensions.width !== dimensions.height) {
    throw new Error(
      `Avatar source must be square: ${source.repositoryPath} (${dimensions.width}x${dimensions.height})`,
    )
  }
  const digest = createHash('sha256')
    .update(sourceBytes)
    .update(PIPELINE_VERSION)
    .update(JSON.stringify(RESPONSIVE_IMAGE_ENCODING))
    .digest('hex')
    .slice(0, 16)
  const widths = candidateWidths(dimensions.width, source.maxWidth)
  const baseCacheKey = `${source.id}.${digest}.${RESPONSIVE_IMAGE_WIDTHS.join(',')}`
  const cacheKey = source.maxWidth ? `${baseCacheKey}.${source.maxWidth}` : baseCacheKey
  const previousCandidates = previous[cacheKey] ?? previous[baseCacheKey]
  const cached = previousCandidates?.filter(({ width }) => widths.includes(width))
  if (cached?.length === widths.length && (await allExist(cached))) {
    return { cacheKey, image: { ...dimensions, ...RESPONSIVE_IMAGE_ENCODING, candidates: cached } }
  }

  const candidates: Candidate[] = []
  for (const width of widths) {
    const output = await sharp(sourceBytes)
      .rotate()
      // JPEG shrink-on-load can round a dimension before the final resize.
      .resize({ width, withoutEnlargement: true, fastShrinkOnLoad: false })
      .flatten({ background: APP_ICON_BACKGROUND })
      .jpeg({
        quality: RESPONSIVE_IMAGE_ENCODING.quality,
        progressive: RESPONSIVE_IMAGE_ENCODING.progressive,
        chromaSubsampling: RESPONSIVE_IMAGE_ENCODING.chromaSubsampling,
      })
      .toBuffer({ resolveWithObject: true })
    const fileName = `${source.id}.${digest}.w${output.info.width}.jpg`
    await writeFile(join(OUTPUT_DIRECTORY, fileName), output.data)
    candidates.push({
      src: `/assets/generated-images/${fileName}`,
      width: output.info.width,
      height: output.info.height,
      bytes: output.data.byteLength,
    })
  }
  return { cacheKey, image: { ...dimensions, ...RESPONSIVE_IMAGE_ENCODING, candidates } }
}

/** Encodes sources on one worker per CPU core; results keep the source order. */
async function encodeSources(previous: Record<string, Candidate[]>): Promise<EncodedSource[]> {
  const results: EncodedSource[] = Array.from({ length: RESPONSIVE_IMAGE_SOURCES.length })
  let next = 0
  const worker = async (): Promise<void> => {
    while (next < RESPONSIVE_IMAGE_SOURCES.length) {
      const index = next++
      results[index] = await encodeSource(RESPONSIVE_IMAGE_SOURCES[index], previous)
    }
  }
  await Promise.all(Array.from({ length: availableParallelism() }, worker))
  return results
}

async function generateContentImages(): Promise<Record<string, GeneratedImage>> {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true })
  const encoded = await encodeSources(await readCache())
  const cache: Record<string, Candidate[]> = {}
  const generated: Record<string, GeneratedImage> = {}
  for (const [index, { cacheKey, image }] of encoded.entries()) {
    cache[cacheKey] = image.candidates
    generated[RESPONSIVE_IMAGE_SOURCES[index].logicalSource] = image
  }

  // Remove derivatives of sources that changed or were removed.
  const current = new Set(
    Object.values(cache).flatMap((candidates) =>
      candidates.map((candidate) => candidate.src.split('/').at(-1)),
    ),
  )
  for (const file of await readdir(OUTPUT_DIRECTORY)) {
    if (!current.has(file)) await rm(join(OUTPUT_DIRECTORY, file), { force: true })
  }
  await mkdir(dirname(CACHE_FILE), { recursive: true })
  await writeFile(CACHE_FILE, JSON.stringify(cache))
  return generated
}

async function generateOpaqueAppIcons(): Promise<void> {
  const source = await readFile(join(ROOT, 'assets/images/app/logo512.png'))
  const logo192 = await sharp(source)
    .resize(192, 192)
    .flatten({ background: APP_ICON_BACKGROUND })
    .png({ compressionLevel: 9 })
    .toBuffer()
  const logo512 = await sharp(source)
    .resize(512, 512)
    .flatten({ background: APP_ICON_BACKGROUND })
    .png({ compressionLevel: 9 })
    .toBuffer()
  const faviconPng = await sharp(source)
    .resize(256, 256)
    .flatten({ background: APP_ICON_BACKGROUND })
    .png({ compressionLevel: 9 })
    .toBuffer()

  await Promise.all([
    writeFile(join(ROOT, 'public/logo192.png'), logo192),
    writeFile(join(ROOT, 'public/logo512.png'), logo512),
    writeFile(join(ROOT, 'public/favicon.ico'), await pngToIco(faviconPng)),
  ])
}

async function generate(): Promise<void> {
  const startedAt = performance.now()
  await requireOriginals()
  const generated = await generateContentImages()
  await generateOpaqueAppIcons()
  await mkdir(dirname(GENERATED_MODULE), { recursive: true })
  const campaign: Record<string, GeneratedImage> = {}
  const library: Record<string, GeneratedImage> = {}
  for (const [path, image] of Object.entries(generated)) {
    const target = path.startsWith('/assets/library/') ? library : campaign
    target[path] = image
  }
  const header = '// Generated by scripts/generate-responsive-images.ts. Do not edit.\n'
  await Promise.all([
    writeFile(
      GENERATED_MODULE,
      header +
        `export const GENERATED_RESPONSIVE_IMAGES = ${JSON.stringify(campaign, null, 2)} as const\n`,
    ),
    writeFile(
      LIBRARY_MODULE,
      header +
        `export const GENERATED_LIBRARY_RESPONSIVE_IMAGES = ${JSON.stringify(library, null, 2)} as const\n`,
    ),
  ])

  const outputFiles = await readdir(OUTPUT_DIRECTORY)
  const sourceBytes = (
    await Promise.all(
      RESPONSIVE_IMAGE_SOURCES.map(
        async ({ repositoryPath }) => (await readFile(join(ROOT, repositoryPath))).byteLength,
      ),
    )
  ).reduce((sum, bytes) => sum + bytes, 0)
  const smallestCandidateBytes = Object.values(generated).reduce(
    (sum, image) => sum + (image.candidates[0]?.bytes ?? 0),
    0,
  )
  console.log(
    `Generated ${outputFiles.length} progressive JPEGs for ${RESPONSIVE_IMAGE_SOURCES.length} sources in ${Math.round(performance.now() - startedAt)} ms (${sourceBytes} source bytes; ${smallestCandidateBytes} bytes across smallest candidates)`,
  )
}

await generate()
