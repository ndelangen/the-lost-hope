import { existsSync } from 'node:fs'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { gzipSync } from 'node:zlib'

import { JSDOM } from 'jsdom'
import sharp from 'sharp'

import { GENERATED_RESPONSIVE_IMAGES } from '../src/generated/responsive-images'
import { PUBLIC_PAGE_DESCRIPTORS } from '../src/lib/public-page-descriptors'
import { RESPONSIVE_IMAGE_SOURCES } from './image-sources'
import { jpegFrame } from './jpeg'
/* oxlint-disable no-await-in-loop -- the audit reports the precise route or asset that fails */

const ROOT = process.cwd()
const OUTPUT_DIRECTORY = join(ROOT, 'dist/client')
const ASSET_DIRECTORY = join(OUTPUT_DIRECTORY, 'assets')
const REPRESENTATIVE_ROUTES = ['/', '/events', '/pcs/detail/jim', '/locations/map', '/questions']
const BASELINE_SHARED_ENTRY_GZIP = 2_973_770
const IMAGE_ROLE_MAX_WIDTH = new Map([
  ['14px', 32],
  ['20px', 64],
  ['32px', 64],
  ['48px', 128],
  ['56px', 128],
  ['64px', 128],
  ['112px', 256],
  ['160px', 384],
  ['176px', 384],
])

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

function outputPath(route: string): string {
  return route === '/'
    ? join(OUTPUT_DIRECTORY, 'index.html')
    : join(OUTPUT_DIRECTORY, `${route}.html`)
}

function staticImports(source: string): string[] {
  return [...source.matchAll(/\bimport\s+(?!\()[^;]*?from\s*["'](?<path>\.\/[^"']+\.js)["']/gu)]
    .map((match) => match.groups?.path)
    .filter((path): path is string => Boolean(path))
}

function sourceSetWidths(sourceSet: string): number[] {
  return sourceSet.split(',').map((candidate) => {
    const descriptor = candidate.trim().split(/\s+/u).at(-1) ?? ''
    assert(/^\d+w$/u.test(descriptor), `Invalid srcset width descriptor: ${candidate}`)
    return Number.parseInt(descriptor, 10)
  })
}

async function initialJavaScript(
  entryUrl: string,
): Promise<{ files: string[]; raw: number; gzip: number }> {
  const entryPath = join(OUTPUT_DIRECTORY, entryUrl.replace(/^\//u, ''))
  const pending = [entryPath]
  const visited = new Set<string>()
  let raw = 0
  let gzip = 0

  while (pending.length > 0) {
    const path = pending.pop()
    if (!path || visited.has(path)) continue
    visited.add(path)
    const bytes = await readFile(path)
    const source = bytes.toString('utf8')
    raw += bytes.byteLength
    gzip += gzipSync(bytes).byteLength
    for (const imported of staticImports(source)) pending.push(join(dirname(path), imported))
  }

  return { files: [...visited].map((path) => basename(path)).toSorted(), raw, gzip }
}

async function assertOpaque(path: string): Promise<void> {
  const { channels } = await sharp(path).stats()
  const alpha = channels[3]
  assert(!alpha || (alpha.min === 255 && alpha.max === 255), `${path} contains transparent pixels`)
}

async function assertOpaqueIco(path: string): Promise<void> {
  const bytes = await readFile(path)
  const imageCount = bytes.readUInt16LE(4)
  assert(imageCount > 0, `${path} contains no icon images`)
  for (let index = 0; index < imageCount; index += 1) {
    const directoryOffset = 6 + index * 16
    const width = bytes[directoryOffset] || 256
    const height = bytes[directoryOffset + 1] || 256
    const imageOffset = bytes.readUInt32LE(directoryOffset + 12)
    const pixelOffset = imageOffset + 40
    for (let pixel = 0; pixel < width * height; pixel += 1) {
      assert(bytes[pixelOffset + pixel * 4 + 3] === 255, `${path} contains transparent pixels`)
    }
  }
}

async function auditGeneratedImages(): Promise<void> {
  const expectedFiles = new Set<string>()
  for (const [logicalSource, image] of Object.entries(GENERATED_RESPONSIVE_IMAGES)) {
    assert(image.quality === 80, `${logicalSource} is not configured for q80`)
    assert(image.progressive, `${logicalSource} is not configured as progressive`)
    assert(image.chromaSubsampling === '4:2:0', `${logicalSource} is not configured as 4:2:0`)
    assert(image.candidates[0]?.width === 32, `${logicalSource} does not start with a 32 px source`)

    for (const candidate of image.candidates) {
      const path = join(OUTPUT_DIRECTORY, candidate.src)
      expectedFiles.add(basename(path))
      const bytes = await readFile(path)
      const frame = jpegFrame(bytes)
      assert(frame.progressive, `${candidate.src} is baseline JPEG`)
      assert(frame.chromaSubsampling === '4:2:0', `${candidate.src} is not 4:2:0`)
      assert(
        frame.width === candidate.width && frame.height === candidate.height,
        `${candidate.src} dimensions do not match the generated manifest`,
      )
    }
  }

  const outputFiles = new Set(await readdir(join(ASSET_DIRECTORY, 'generated-images')))
  assert(
    outputFiles.size === expectedFiles.size &&
      [...outputFiles].every((file) => expectedFiles.has(file)),
    'Published responsive image candidates do not match the generated manifest',
  )
  for (const source of RESPONSIVE_IMAGE_SOURCES) {
    if (!source.logicalSource.startsWith('/')) continue
    assert(
      !existsSync(join(OUTPUT_DIRECTORY, source.logicalSource)),
      `Published original raster: ${source.logicalSource}`,
    )
  }

  await Promise.all([
    assertOpaque(join(OUTPUT_DIRECTORY, 'logo192.png')),
    assertOpaque(join(OUTPUT_DIRECTORY, 'logo512.png')),
    assertOpaqueIco(join(OUTPUT_DIRECTORY, 'favicon.ico')),
  ])
  assert(
    !existsSync(join(OUTPUT_DIRECTORY, 'tanstack-circle-logo.png')),
    'Unused TanStack PNG remains',
  )
}

async function auditHtmlAndReport(): Promise<void> {
  const report: Array<{
    route: string
    initialJavaScriptRaw: number
    initialJavaScriptGzip: number
    changeFromBaselinePercent: number
    initialGraphFiles: string[]
    prerenderedImages: number
  }> = []

  for (const route of REPRESENTATIVE_ROUTES) {
    const document = new JSDOM(await readFile(outputPath(route), 'utf8')).window.document
    const entry = document
      .querySelector<HTMLScriptElement>('script[type="module"][src]')
      ?.getAttribute('src')
    assert(entry, `${route} has no module entry`)
    const javascript = await initialJavaScript(entry)
    assert(
      javascript.files.every((file) => !file.startsWith('___icons-') && !file.startsWith('icons-')),
      `${route} initial graph includes an icon catalogue chunk`,
    )
    for (const image of document.querySelectorAll<HTMLImageElement>('img')) {
      const source = image.getAttribute('src') ?? ''
      if (!source.includes('/assets/generated-images/')) continue
      const sourceSet = image.getAttribute('srcset')
      const sizes = image.getAttribute('sizes')
      assert(sourceSet, `${route} responsive image lacks srcset`)
      assert(sizes, `${route} responsive image lacks sizes`)
      assert(
        image.getAttribute('width') && image.getAttribute('height'),
        `${route} image lacks dimensions`,
      )
      assert(image.getAttribute('loading'), `${route} image lacks an explicit loading policy`)
      const maximumWidth = IMAGE_ROLE_MAX_WIDTH.get(sizes)
      if (maximumWidth !== undefined) {
        assert(
          Math.max(...sourceSetWidths(sourceSet)) <= maximumWidth,
          `${route} ${sizes} image advertises a candidate wider than ${maximumWidth}px`,
        )
      }
    }

    report.push({
      route,
      initialJavaScriptRaw: javascript.raw,
      initialJavaScriptGzip: javascript.gzip,
      changeFromBaselinePercent:
        ((javascript.gzip - BASELINE_SHARED_ENTRY_GZIP) / BASELINE_SHARED_ENTRY_GZIP) * 100,
      initialGraphFiles: javascript.files,
      prerenderedImages: document.images.length,
    })
  }

  const jim = new JSDOM(await readFile(outputPath('/pcs/detail/jim'), 'utf8')).window.document
  assert(
    ![...jim.querySelectorAll('img')].some((image) => image.getAttribute('sizes') === '100vw'),
    'Large portrait viewer image was prerendered before interaction',
  )
  assert(
    PUBLIC_PAGE_DESCRIPTORS.every(({ path }) => existsSync(outputPath(path))),
    'At least one public route was not prerendered',
  )

  const output = join(ROOT, 'dist/delivery-footprint-report.json')
  await writeFile(
    output,
    `${JSON.stringify({ baselineSharedEntryGzip: BASELINE_SHARED_ENTRY_GZIP, routes: report }, null, 2)}\n`,
  )
  console.table(
    report.map(
      ({ route, initialJavaScriptRaw, initialJavaScriptGzip, changeFromBaselinePercent }) => ({
        route,
        raw: initialJavaScriptRaw,
        gzip: initialJavaScriptGzip,
        change: `${changeFromBaselinePercent.toFixed(1)}%`,
      }),
    ),
  )
  console.log(`Wrote ${output}`)
}

await auditGeneratedImages()
await auditHtmlAndReport()
