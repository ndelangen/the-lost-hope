import { existsSync } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { JSDOM } from 'jsdom'
/* oxlint-disable no-await-in-loop -- the audit reports the precise public page or asset that fails */

import { GENERATED_SOCIAL_IMAGE_PATHS } from '../src/generated/social-image-paths'
import {
  PUBLIC_PAGE_DESCRIPTORS,
  SITE_ORIGIN,
  validatePublicPageDescriptors,
} from '../src/lib/public-page-descriptors'

const ROOT = process.cwd()
const OUTPUT_DIRECTORY = join(ROOT, 'dist/client')
const SOCIAL_IMAGE_PATHS = GENERATED_SOCIAL_IMAGE_PATHS as Readonly<Record<string, string>>

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

function pageOutputPath(path: string): string {
  return path === '/'
    ? join(OUTPUT_DIRECTORY, 'index.html')
    : join(OUTPUT_DIRECTORY, `${path}.html`)
}

function pngDimensions(bytes: Buffer): { width: number; height: number } {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  assert(bytes.subarray(0, 8).equals(signature), 'Social image is not a PNG')
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) }
}

async function audit(): Promise<void> {
  const errors = validatePublicPageDescriptors()
  assert(errors.length === 0, errors.join('\n'))
  assert(PUBLIC_PAGE_DESCRIPTORS.length === 323, 'The public-page contract must contain 323 pages')

  const expectedPaths = new Set(PUBLIC_PAGE_DESCRIPTORS.map(({ path }) => path))
  const pagesData = JSON.parse(await readFile(join(OUTPUT_DIRECTORY, 'pages.json'), 'utf8')) as {
    pages: Array<{ path: string }>
  }
  const builtPaths = pagesData.pages.map(({ path }) => path)
  assert(
    builtPaths.length === expectedPaths.size,
    `Expected 323 sitemap pages, found ${builtPaths.length}`,
  )
  assert(
    builtPaths.every((path) => expectedPaths.has(path)),
    `Unexpected sitemap paths: ${builtPaths.filter((path) => !expectedPaths.has(path)).join(', ')}`,
  )

  const sitemap = await readFile(join(OUTPUT_DIRECTORY, 'sitemap.xml'), 'utf8')
  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/gu)].map((match) => match[1])
  const expectedUrls = new Set([...expectedPaths].map((path) => new URL(path, SITE_ORIGIN).href))
  assert(
    sitemapUrls.length === expectedUrls.size,
    `Expected 323 sitemap URLs, found ${sitemapUrls.length}`,
  )
  assert(
    sitemapUrls.every((url) => url && expectedUrls.has(url)),
    `Unexpected sitemap URLs: ${sitemapUrls.filter((url) => !url || !expectedUrls.has(url)).join(', ')}`,
  )

  const referencedLocalImages = new Set<string>()
  for (const page of PUBLIC_PAGE_DESCRIPTORS) {
    const htmlPath = pageOutputPath(page.path)
    assert(existsSync(htmlPath), `Missing prerendered HTML: ${page.path}`)
    const document = new JSDOM(await readFile(htmlPath, 'utf8')).window.document
    const expectedTitle = page.path === '/' ? page.title : `${page.title} | The Lost Hope`
    const socialImage = new URL(SOCIAL_IMAGE_PATHS[page.path] ?? '', SITE_ORIGIN).href

    assert(document.title === expectedTitle, `Wrong title: ${page.path}`)
    assert(
      document.querySelector('meta[name="description"]')?.getAttribute('content') ===
        page.description,
      `Wrong description: ${page.path}`,
    )
    assert(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href') ===
        new URL(page.path, SITE_ORIGIN).href,
      `Wrong canonical URL: ${page.path}`,
    )
    assert(
      document.querySelector('meta[property="og:image"]')?.getAttribute('content') === socialImage,
      `Wrong Open Graph image: ${page.path}`,
    )
    assert(
      document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') === socialImage,
      `Wrong Twitter image: ${page.path}`,
    )
    const structuredData = document.querySelector('script[type="application/ld+json"]')?.textContent
    assert(structuredData, `Missing structured data: ${page.path}`)
    JSON.parse(structuredData)
    assert(document.querySelector('main'), `Missing main content: ${page.path}`)
    assert(document.querySelector('h1'), `Missing page heading: ${page.path}`)
    assert(document.querySelector('a[href]'), `Missing crawlable links: ${page.path}`)

    for (const image of document.querySelectorAll<HTMLImageElement>('img[src]')) {
      const source = image.getAttribute('src')
      if (!source || source.startsWith('data:')) continue
      const url = new URL(source, SITE_ORIGIN)
      if (url.origin === SITE_ORIGIN) referencedLocalImages.add(url.pathname)
    }
  }

  for (const path of referencedLocalImages) {
    assert(
      existsSync(join(OUTPUT_DIRECTORY, path)),
      `Missing local image referenced by HTML: ${path}`,
    )
  }

  const socialFiles = (await readdir(join(OUTPUT_DIRECTORY, 'social-previews'))).filter((file) =>
    file.endsWith('.png'),
  )
  assert(socialFiles.length === 323, `Expected 323 social images, found ${socialFiles.length}`)
  for (const path of Object.values(SOCIAL_IMAGE_PATHS)) {
    const bytes = await readFile(join(OUTPUT_DIRECTORY, path))
    const { width, height } = pngDimensions(bytes)
    assert(width === 1200 && height === 630, `Wrong social image dimensions: ${path}`)
    assert(bytes.byteLength <= 1_000_000, `Social image exceeds 1 MB: ${path}`)
  }

  const expectedRedirects = [
    '/locations /locations/map 301',
    ...PUBLIC_PAGE_DESCRIPTORS.filter(({ path }) => path !== '/').map(
      ({ path }) => `${path} ${path}.html 200`,
    ),
    '',
  ].join('\n')
  assert(
    (await readFile(join(OUTPUT_DIRECTORY, '_redirects'), 'utf8')) === expectedRedirects,
    'Generated redirects do not match the public-page contract',
  )
  assert(
    (await readFile(join(OUTPUT_DIRECTORY, 'robots.txt'), 'utf8')) ===
      `User-agent: *\nAllow: /\nDisallow: /_icons\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
    'robots.txt does not match the crawl contract',
  )
  const notFound = await readFile(join(OUTPUT_DIRECTORY, '404.html'), 'utf8')
  assert(notFound.includes('name="robots" content="noindex"'), '404 fallback must be noindex')
  assert(
    !existsSync(join(OUTPUT_DIRECTORY, '_icons.html')),
    'Internal icon catalogue was published',
  )

  console.log(
    `Audited ${PUBLIC_PAGE_DESCRIPTORS.length} static pages, ${socialFiles.length} social images, and ${referencedLocalImages.size} local content images`,
  )
}

await audit()
