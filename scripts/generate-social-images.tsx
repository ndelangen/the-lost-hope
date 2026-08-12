import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import { Resvg } from '@resvg/resvg-js'
import {
  BookOpen,
  Building2,
  CalendarRange,
  CircleHelp,
  Dog,
  MapPin,
  Package,
  Scroll,
  ScrollText,
  User,
  Users,
} from 'lucide-react'
import type { ReactNode } from 'react'
import satori from 'satori'
/* oxlint-disable no-await-in-loop -- generation is intentionally deterministic and memory-bounded */

import {
  PUBLIC_PAGE_DESCRIPTORS,
  SITE_ORIGIN,
  SOCIAL_PREVIEW_VERSION,
  validatePublicPageDescriptors,
  type PublicPageDescriptor,
} from '../src/lib/public-page-descriptors'

const ROOT = process.cwd()
const OUTPUT_DIRECTORY = join(ROOT, 'public/social-previews')
const GENERATED_MODULE = join(ROOT, 'src/generated/social-image-paths.ts')
const GENERATED_PUBLIC_ASSETS_MODULE = join(ROOT, 'src/generated/public-asset-paths.ts')
const FONT_DIRECTORY = join(ROOT, 'assets/fonts/inter')
const RENDERER_VERSIONS = 'satori@0.29.0|@resvg/resvg-js@2.6.2'

type Font = {
  name: string
  data: ArrayBuffer
  weight: 400 | 700 | 900
  style: 'normal'
}

function arrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer
}

async function loadFonts(): Promise<Font[]> {
  const faces = [
    ['Inter-Regular.ttf', 400],
    ['Inter-Bold.ttf', 700],
    ['Inter-Black.ttf', 900],
  ] as const
  return Promise.all(
    faces.map(async ([file, weight]) => ({
      name: 'Inter',
      data: arrayBuffer(await readFile(join(FONT_DIRECTORY, file))),
      weight,
      style: 'normal' as const,
    })),
  )
}

async function listPublicAssets(
  directory = join(ROOT, 'public/assets'),
  publicPrefix = '/assets',
): Promise<string[]> {
  const assets: string[] = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = join(directory, entry.name)
    const publicPath = `${publicPrefix}/${entry.name}`
    if (entry.isDirectory()) {
      assets.push(...(await listPublicAssets(filePath, publicPath)))
    } else if (entry.isFile()) {
      assets.push(publicPath)
    }
  }
  return assets.toSorted()
}

function localImagePath(candidate: string | undefined): string | undefined {
  if (!candidate?.startsWith('/') || candidate.endsWith('/placeholder.svg')) return undefined
  const path = join(ROOT, 'public', candidate.slice(1))
  return existsSync(path) ? path : undefined
}

function mimeType(bytes: Buffer): string {
  if (bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return 'image/png'
  }
  if (bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]))) return 'image/jpeg'
  if (bytes.subarray(0, 4).toString('ascii') === 'RIFF') return 'image/webp'
  if (bytes.subarray(0, 64).toString('utf8').includes('<svg')) return 'image/svg+xml'
  throw new Error('Unsupported social-preview image format')
}

function prepareBackgroundImage(bytes: Buffer): string {
  const source = `data:${mimeType(bytes)};base64,${bytes.toString('base64')}`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="315" viewBox="0 0 600 315"><image href="${source}" width="600" height="315" preserveAspectRatio="xMidYMin slice"/></svg>`
  const resized = new Resvg(svg).render().asPng()
  return `data:image/png;base64,${resized.toString('base64')}`
}

function iconFor(page: PublicPageDescriptor) {
  if (page.pageKind === 'home' || page.pageKind === 'intro') return BookOpen
  if (page.pageKind === 'questions') return CircleHelp
  if (page.pageKind === 'locations') return MapPin
  switch (page.entity?.kind) {
    case 'session':
      return ScrollText
    case 'event':
      return CalendarRange
    case 'location':
      return MapPin
    case 'npc':
      return Users
    case 'beast':
      return Dog
    case 'pc':
      return User
    case 'quest':
      return Scroll
    case 'organization':
      return Building2
    case 'item':
      return Package
    default:
      return BookOpen
  }
}

function safeFileStem(path: string): string {
  return path === '/'
    ? 'home'
    : path
        .slice(1)
        .replaceAll('/', '--')
        .replace(/[^a-z0-9-]/giu, '-')
}

function titleSize(title: string): number {
  if (title.length > 64) return 54
  if (title.length > 44) return 62
  return 76
}

function card(page: PublicPageDescriptor, imageDataUrl: string | undefined): ReactNode {
  const Icon = iconFor(page)
  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#07111f',
        color: '#ffffff',
        fontFamily: 'Inter',
      }}
    >
      {imageDataUrl ? (
        <img
          src={imageDataUrl}
          alt=""
          width="1200"
          height="630"
          style={{
            position: 'absolute',
            inset: 0,
            width: '1200px',
            height: '630px',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: '1200px',
            height: '630px',
            backgroundImage: `radial-gradient(circle at 75% 28%, ${page.accent} 0%, transparent 30%), linear-gradient(135deg, #07111f 0%, #172032 58%, ${page.accent} 100%)`,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '1200px',
          height: '630px',
          backgroundImage:
            'linear-gradient(90deg, rgba(0,0,0,.96) 0%, rgba(0,0,0,.76) 55%, rgba(0,0,0,.16) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '1200px',
          height: '630px',
          backgroundImage:
            'linear-gradient(0deg, rgba(0,0,0,.84) 0%, transparent 48%, rgba(0,0,0,.28) 100%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '1200px',
          height: '630px',
          padding: '52px 62px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '999px',
                border: '1px solid rgba(255,255,255,.25)',
                backgroundColor: 'rgba(255,255,255,.1)',
                fontSize: '20px',
                fontWeight: 900,
              }}
            >
              LH
            </div>
            <span
              style={{
                fontSize: '17px',
                fontWeight: 900,
                letterSpacing: '.19em',
                textTransform: 'uppercase',
              }}
            >
              The Lost Hope
            </span>
          </div>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '.09em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.72)',
            }}
          >
            {page.context}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '50px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '830px' }}>
            <span
              style={{
                marginBottom: '14px',
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '.19em',
                textTransform: 'uppercase',
                color: page.softAccent,
              }}
            >
              {page.eyebrow}
            </span>
            <div
              style={{
                fontSize: `${titleSize(page.title)}px`,
                lineHeight: 0.96,
                fontWeight: 900,
                letterSpacing: '-.052em',
              }}
            >
              {page.title}
            </div>
            <div
              style={{
                marginTop: '20px',
                maxWidth: '790px',
                fontSize: '23px',
                lineHeight: 1.34,
                fontWeight: 400,
                color: 'rgba(255,255,255,.82)',
              }}
            >
              {page.description || 'No further details have been established.'}
            </div>
          </div>
          <div
            style={{
              width: '148px',
              height: '148px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,.25)',
              backgroundColor: 'rgba(0,0,0,.28)',
            }}
          >
            <Icon width={66} height={66} strokeWidth={1.7} color="#ffffff" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ height: '1px', flexGrow: 1, backgroundColor: 'rgba(255,255,255,.28)' }} />
          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.72)',
            }}
          >
            {page.footnote}
          </span>
        </div>
      </div>
    </div>
  )
}

async function generate(): Promise<void> {
  const descriptorErrors = validatePublicPageDescriptors()
  if (descriptorErrors.length) throw new Error(descriptorErrors.join('\n'))

  const startedAt = performance.now()
  const devOnly = process.argv.includes('--dev')
  const pathsOnly = devOnly || process.argv.includes('--paths-only')
  const fonts = pathsOnly ? [] : await loadFonts()
  const fontBytes = await Promise.all(
    ['Inter-Regular.ttf', 'Inter-Bold.ttf', 'Inter-Black.ttf'].map((file) =>
      readFile(join(FONT_DIRECTORY, file)),
    ),
  )

  if (!pathsOnly) {
    await rm(OUTPUT_DIRECTORY, { recursive: true, force: true })
    await mkdir(OUTPUT_DIRECTORY, { recursive: true })
  }
  await mkdir(dirname(GENERATED_MODULE), { recursive: true })

  const paths: Record<string, string> = {}
  for (const page of PUBLIC_PAGE_DESCRIPTORS) {
    const imagePath = localImagePath(page.imageCandidate)
    const imageBytes = imagePath ? await readFile(imagePath) : undefined
    const digest = createHash('sha256')
      .update(JSON.stringify(page))
      .update(SOCIAL_PREVIEW_VERSION)
      .update(RENDERER_VERSIONS)
      .update(fontBytes[0])
      .update(fontBytes[1])
      .update(fontBytes[2])
      .update(imageBytes ?? '')
      .digest('hex')
      .slice(0, 16)
    const fileName = `${safeFileStem(page.path)}.${digest}.png`
    const publicPath = `/social-previews/${fileName}`
    if (!pathsOnly) {
      const imageDataUrl = imageBytes ? prepareBackgroundImage(imageBytes) : undefined
      const svg = await satori(card(page, imageDataUrl), {
        width: 1200,
        height: 630,
        fonts,
      })
      const png = new Resvg(svg).render().asPng()
      if (png.byteLength > 1_000_000) {
        throw new Error(`${page.path} social image is ${png.byteLength} bytes (limit: 1 MB)`)
      }
      await writeFile(join(OUTPUT_DIRECTORY, fileName), png)
    }
    paths[page.path] = publicPath
  }

  if (!pathsOnly) {
    const outputFiles = (await readdir(OUTPUT_DIRECTORY)).filter((file) => file.endsWith('.png'))
    if (outputFiles.length !== PUBLIC_PAGE_DESCRIPTORS.length) {
      throw new Error(
        `Expected ${PUBLIC_PAGE_DESCRIPTORS.length} social images, found ${outputFiles.length}`,
      )
    }
  }

  await writeFile(
    GENERATED_MODULE,
    `// Generated by scripts/generate-social-images.tsx. Do not edit.\nexport const GENERATED_SOCIAL_IMAGE_PATHS = ${JSON.stringify(paths, null, 2)} as const\n`,
  )
  await writeFile(
    GENERATED_PUBLIC_ASSETS_MODULE,
    `// Generated by scripts/generate-social-images.tsx. Do not edit.\nexport const GENERATED_PUBLIC_ASSET_PATHS = ${JSON.stringify(await listPublicAssets(), null, 2)} as const\n`,
  )
  if (devOnly) {
    await Promise.all(
      ['robots.txt', '_redirects', '404.html'].map((file) =>
        rm(join(ROOT, 'public', file), { force: true }),
      ),
    )
  } else {
    await writeFile(
      join(ROOT, 'public/robots.txt'),
      `User-agent: *\nAllow: /\nDisallow: /_icons\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`,
    )
    await writeFile(
      join(ROOT, 'public/_redirects'),
      [
        '/locations /locations/map 301',
        ...PUBLIC_PAGE_DESCRIPTORS.filter((page) => page.path !== '/').map(
          (page) => `${page.path} ${page.path}.html 200`,
        ),
        '',
      ].join('\n'),
    )
    await writeFile(
      join(ROOT, 'public/404.html'),
      '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | The Lost Hope</title></head><body><main><h1>Page not found</h1><p>This campaign record does not exist.</p><a href="/">Return to The Lost Hope</a></main></body></html>\n',
    )
  }
  console.log(
    `${pathsOnly ? 'Generated social image paths for' : 'Generated'} ${PUBLIC_PAGE_DESCRIPTORS.length}${pathsOnly ? ' pages' : ' social images'} in ${Math.round(performance.now() - startedAt)} ms`,
  )
}

await generate()
