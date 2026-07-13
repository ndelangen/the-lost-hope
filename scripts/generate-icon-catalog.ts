import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { icons as LucideIcons } from 'lucide-react'
import * as FontAwesomeIcons from 'react-icons/fa'
import * as GameIcons from 'react-icons/gi'

import {
  buildIconCatalogEntry,
  humanizeIconName,
  type IconMetadataSeed,
} from '../src/icon-catalog/metadata'
import type {
  IconCatalog,
  IconCatalogOverride,
  IconCatalogSource,
  IconSource,
} from '../src/icon-catalog/types'
import { CUSTOM_ICONS, CUSTOM_ICON_METADATA } from '../src/lib/custom-icons'

const ROOT = path.resolve(import.meta.dirname, '..')
export const GENERATED_ICON_CATALOG_PATH = path.join(ROOT, 'src/icon-catalog/catalog.json')
const OVERRIDES_PATH = path.join(ROOT, 'src/icon-catalog/overrides.json')
const FONT_AWESOME_METADATA_PATH = path.join(ROOT, 'src/icon-catalog/upstream/font-awesome.json')
const GAME_ICONS_METADATA_PATH = path.join(ROOT, 'src/icon-catalog/upstream/game-icons.json')
const LUCIDE_ICONS_DIR = path.join(ROOT, 'node_modules/lucide-react/dist/esm/icons')
const LUCIDE_DYNAMIC_IMPORTS_PATH = path.join(
  ROOT,
  'node_modules/lucide-react/dist/esm/dynamicIconImports.js',
)
const FONT_AWESOME_BRANDS_DIR = path.join(
  ROOT,
  'node_modules/@fortawesome/fontawesome-free/svgs/brands',
)
const FONT_AWESOME_SPRITES_DIR = path.join(
  ROOT,
  'node_modules/@fortawesome/fontawesome-free/sprites',
)
const PUBLIC_ICON_ASSETS_DIR = path.join(ROOT, 'public/assets/icon-catalog')
const FONT_AWESOME_SPRITES = ['brands', 'regular', 'solid'] as const

type FontAwesomeUpstreamIcon = {
  label: string
  searchTerms: Array<string>
  styles: Array<string>
}

type GameIconsUpstreamIcon = {
  label: string
  sourceDescriptions: Array<string>
  tags: Array<string>
  sourceUrls: Array<string>
  authors: Array<string>
  ambiguous: boolean
}

const SOURCES: Array<IconCatalogSource> = [
  {
    id: 'lucide',
    label: 'Lucide',
    license: 'ISC',
    url: 'https://lucide.dev/icons/',
    canonicalFor: 'Generic web UI',
  },
  {
    id: 'fa',
    label: 'Font Awesome 5',
    license: 'CC BY 4.0',
    url: 'https://fontawesome.com/v5/search',
  },
  {
    id: 'gi',
    label: 'Game Icons',
    license: 'CC BY 3.0',
    url: 'https://game-icons.net/',
    canonicalFor: 'Fantasy, RPG, and game-world concepts',
  },
  {
    id: 'custom',
    label: 'Project custom icons',
    license: 'Project-owned or individually documented',
    canonicalFor: 'Campaign-specific concepts unavailable elsewhere',
  },
]

const DUPLICATE_ALIASES: Readonly<Record<string, string>> = {
  cog: 'lucide/Settings',
  longarrowaltleft: 'lucide/ArrowLeft',
  longarrowaltright: 'lucide/ArrowRight',
  mapmarkeralt: 'lucide/MapPin',
  times: 'lucide/X',
}

function canonicalName(value: string): string {
  return value.toLocaleLowerCase().replace(/[^a-z\d]/gu, '')
}

function titleFromSourceName(value: string): string {
  return value
    .split(/[-_\s]+/u)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toLocaleUpperCase()}${word.slice(1)}`)
    .join(' ')
}

async function jsonFile<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, 'utf8')) as T
}

async function filesBelow(directory: string): Promise<Array<string>> {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory() ? filesBelow(entryPath) : [entryPath]
    }),
  )
  return files.flat()
}

async function lucideSeeds(): Promise<Array<IconMetadataSeed>> {
  const iconFiles = (await readdir(LUCIDE_ICONS_DIR)).filter((file) => file.endsWith('.js'))
  const dynamicImports = await readFile(LUCIDE_DYNAMIC_IMPORTS_PATH, 'utf8')
  const aliasesByFile = new Map<string, Array<string>>()

  for (const match of dynamicImports.matchAll(
    /"(?<alias>[^"]+)": \(\) => import\('\.\/icons\/(?<file>[^']+)\.js'\)/gu,
  )) {
    const alias = match.groups?.alias
    const file = match.groups?.file
    if (!alias || !file) continue
    const aliases = aliasesByFile.get(file) ?? []
    aliases.push(alias)
    aliasesByFile.set(file, aliases)
  }

  const seeds = (
    await Promise.all(
      iconFiles.map(async (file) => {
        const source = await readFile(path.join(LUCIDE_ICONS_DIR, file), 'utf8')
        const match = /const (?<componentName>\w+) = createLucideIcon\(\s*"(?<slug>[^"]+)"/u.exec(
          source,
        )
        const componentName = match?.groups?.componentName
        const slug = match?.groups?.slug
        if (!componentName || !slug) return undefined

        const aliases = (aliasesByFile.get(slug) ?? []).filter((alias) => alias !== slug)

        return {
          id: `lucide/${componentName}`,
          source: 'lucide' as const,
          componentName,
          label: humanizeIconName(componentName, 'lucide'),
          aliases,
          keywords: aliases,
          sourceCategories: ['lucide/canonical'],
          metadataConfidence: 'source' as const,
          sourceUrl: `https://lucide.dev/icons/${slug}`,
        }
      }),
    )
  ).filter((seed): seed is NonNullable<typeof seed> => seed !== undefined)

  const exportedNames = new Set(Object.keys(LucideIcons))
  const missingExport = seeds.find((seed) => !exportedNames.has(seed.componentName))
  if (missingExport) throw new Error(`Lucide export missing for ${missingExport.componentName}`)
  if (seeds.length !== exportedNames.size) {
    throw new Error(`Expected ${exportedNames.size} canonical Lucide icons, found ${seeds.length}`)
  }

  return seeds.toSorted((left, right) => left.id.localeCompare(right.id))
}

function duplicateFor(
  componentName: string,
  source: IconSource,
  lucideByCanonicalName: ReadonlyMap<string, string>,
): string | undefined {
  let sourceName = componentName.replace(source === 'fa' ? /^Fa/u : /^Gi/u, '')
  if (source === 'fa') sourceName = sourceName.replace(/^Reg/u, '')
  const normalizedName = canonicalName(sourceName)
  return lucideByCanonicalName.get(normalizedName) ?? DUPLICATE_ALIASES[normalizedName]
}

async function fontAwesomeSeeds(
  lucideByCanonicalName: ReadonlyMap<string, string>,
): Promise<Array<IconMetadataSeed>> {
  const upstream = await jsonFile<Record<string, FontAwesomeUpstreamIcon>>(
    FONT_AWESOME_METADATA_PATH,
  )
  const upstreamByCanonicalName = new Map(
    Object.entries(upstream).map(([name, metadata]) => [canonicalName(name), { name, metadata }]),
  )
  const brandNames = new Set(
    (await readdir(FONT_AWESOME_BRANDS_DIR))
      .filter((file) => file.endsWith('.svg'))
      .map((file) => canonicalName(file.replace(/\.svg$/u, ''))),
  )

  return Object.keys(FontAwesomeIcons)
    .toSorted()
    .map((componentName) => {
      const exportName = componentName.replace(/^Fa/u, '')
      const direct = upstreamByCanonicalName.get(canonicalName(exportName))
      const regular = exportName.startsWith('Reg')
        ? upstreamByCanonicalName.get(canonicalName(exportName.slice(3)))
        : undefined
      const match = direct ?? regular
      const isRegular = direct === undefined && regular !== undefined
      const isBrand = brandNames.has(canonicalName(match?.name ?? exportName))
      const sourceCategories = [
        isBrand ? 'brand/logo' : isRegular ? 'style/regular' : 'style/solid',
      ]

      return {
        id: `fa/${componentName}`,
        source: 'fa' as const,
        componentName,
        label: match
          ? titleFromSourceName(match.metadata.label)
          : humanizeIconName(componentName, 'fa'),
        aliases: match?.metadata.searchTerms ?? [],
        keywords: match?.metadata.searchTerms ?? [],
        sourceCategories,
        duplicateOf: duplicateFor(componentName, 'fa', lucideByCanonicalName),
        metadataConfidence: match ? ('source' as const) : ('name-derived' as const),
        sourceUrl: match ? `https://fontawesome.com/v5/icons/${match.name}` : undefined,
      }
    })
}

async function gameIconSeeds(
  lucideByCanonicalName: ReadonlyMap<string, string>,
): Promise<Array<IconMetadataSeed>> {
  const upstream = await jsonFile<Record<string, GameIconsUpstreamIcon>>(GAME_ICONS_METADATA_PATH)

  return Object.keys(GameIcons)
    .toSorted()
    .map((componentName) => {
      const metadata = upstream[componentName]
      return {
        id: `gi/${componentName}`,
        source: 'gi' as const,
        componentName,
        label: metadata?.label ?? humanizeIconName(componentName, 'gi'),
        keywords: metadata?.tags ?? [],
        sourceCategories: metadata?.tags ?? [],
        sourceDescription: metadata?.sourceDescriptions.join(' / '),
        attribution:
          metadata && metadata.authors.length > 0
            ? `Game Icons by ${metadata.authors.join(', ')}`
            : undefined,
        duplicateOf: duplicateFor(componentName, 'gi', lucideByCanonicalName),
        metadataConfidence: metadata
          ? metadata.ambiguous
            ? ('ambiguous-source' as const)
            : ('source' as const)
          : ('name-derived' as const),
        sourceUrl: metadata?.sourceUrls[0],
      }
    })
}

function customSeeds(): Array<IconMetadataSeed> {
  return Object.keys(CUSTOM_ICONS).map((id) => {
    const metadata = CUSTOM_ICON_METADATA[id as keyof typeof CUSTOM_ICON_METADATA]
    return {
      id,
      source: 'custom',
      componentName: id.split('/').at(-1) ?? id,
      label: metadata.label,
      description: metadata.description,
      keywords: metadata.keywords,
      categories: metadata.categories,
      useCases: metadata.useCases,
      metadataConfidence: 'custom',
    }
  })
}

function recordUsage(usage: Map<string, Set<string>>, id: string, file: string): void {
  const files = usage.get(id) ?? new Set<string>()
  files.add(file)
  usage.set(id, files)
}

function importedNames(source: string, moduleName: string): Array<string> {
  const escapedModule = moduleName.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
  const names: Array<string> = []

  for (const match of source.matchAll(
    new RegExp(
      `import\\s+(?:type\\s+)?\\{(?<body>[\\s\\S]*?)\\}\\s+from\\s+['"]${escapedModule}['"]`,
      'gu',
    ),
  )) {
    for (const item of match.groups?.body.split(',') ?? []) {
      const imported = item
        .trim()
        .replace(/^type\s+/u, '')
        .split(/\s+as\s+/u)[0]
        ?.trim()
      if (imported) names.push(imported)
    }
  }

  return names
}

async function iconUsage(allIds: ReadonlySet<string>): Promise<Map<string, Set<string>>> {
  const usage = new Map<string, Set<string>>()
  const sourceFiles = (await filesBelow(path.join(ROOT, 'src'))).filter(
    (file) => /\.(?:ts|tsx)$/u.test(file) && !file.includes('/icon-catalog/'),
  )

  await Promise.all(
    sourceFiles.map(async (filePath) => {
      const source = await readFile(filePath, 'utf8')
      const relativePath = path.relative(ROOT, filePath)

      for (const match of source.matchAll(/['"](?<id>(?:fa|gi|custom)\/[A-Za-z\d]+)['"]/gu)) {
        const id = match.groups?.id
        if (id && allIds.has(id)) recordUsage(usage, id, relativePath)
      }

      for (const componentName of importedNames(source, 'lucide-react')) {
        const id = `lucide/${componentName}`
        if (allIds.has(id)) recordUsage(usage, id, relativePath)
      }
      for (const componentName of importedNames(source, 'react-icons/fa')) {
        const id = `fa/${componentName}`
        if (allIds.has(id)) recordUsage(usage, id, relativePath)
      }
      for (const componentName of importedNames(source, 'react-icons/gi')) {
        const id = `gi/${componentName}`
        if (allIds.has(id)) recordUsage(usage, id, relativePath)
      }
    }),
  )

  return usage
}

async function generatedCatalog(): Promise<IconCatalog> {
  const lucide = await lucideSeeds()
  const lucideByCanonicalName = new Map(
    lucide.map((seed) => [canonicalName(seed.componentName), seed.id]),
  )
  const seeds = [
    ...lucide,
    ...(await fontAwesomeSeeds(lucideByCanonicalName)),
    ...(await gameIconSeeds(lucideByCanonicalName)),
    ...customSeeds(),
  ].toSorted((left, right) => left.id.localeCompare(right.id))
  const ids = new Set(seeds.map(({ id }) => id))
  if (ids.size !== seeds.length) throw new Error('Duplicate icon IDs in the generated catalog')

  const overrides = await jsonFile<Record<string, IconCatalogOverride>>(OVERRIDES_PATH)
  const unknownOverride = Object.keys(overrides).find((id) => !ids.has(id))
  if (unknownOverride)
    throw new Error(`Icon catalog override references unknown icon ${unknownOverride}`)

  const usage = await iconUsage(ids)

  return {
    schemaVersion: 2,
    sources: SOURCES,
    entries: seeds.map((seed) =>
      buildIconCatalogEntry(seed, [...(usage.get(seed.id) ?? [])], overrides[seed.id]),
    ),
  }
}

async function syncFontAwesomeSprites(checkOnly: boolean): Promise<boolean> {
  const sprites = await Promise.all(
    FONT_AWESOME_SPRITES.map(async (style) => {
      const source = await readFile(path.join(FONT_AWESOME_SPRITES_DIR, `${style}.svg`))
      const targetPath = path.join(PUBLIC_ICON_ASSETS_DIR, `font-awesome-${style}.svg`)
      const current = await readFile(targetPath).catch(() => undefined)
      return { source, targetPath, changed: !current?.equals(source) }
    }),
  )
  const changedSprites = sprites.filter((sprite) => sprite.changed)
  if (changedSprites.length === 0) return false
  if (checkOnly) {
    throw new Error('Font Awesome icon sprites are stale. Run `bun run generate:icons`.')
  }

  await mkdir(PUBLIC_ICON_ASSETS_DIR, { recursive: true })
  await Promise.all(changedSprites.map(({ source, targetPath }) => writeFile(targetPath, source)))
  return true
}

export async function generateIconCatalog(options: { check?: boolean } = {}): Promise<boolean> {
  const spritesChanged = await syncFontAwesomeSprites(options.check ?? false)
  const expected = `${JSON.stringify(await generatedCatalog(), null, 2)}\n`
  const current = await readFile(GENERATED_ICON_CATALOG_PATH, 'utf8').catch(() => '')
  if (current === expected) return spritesChanged

  if (options.check) {
    throw new Error('Generated icon catalog is stale. Run `bun run generate:icons` and commit it.')
  }

  await mkdir(path.dirname(GENERATED_ICON_CATALOG_PATH), { recursive: true })
  await writeFile(GENERATED_ICON_CATALOG_PATH, expected)
  return true
}

const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : undefined
const isCli = invokedPath === fileURLToPath(import.meta.url)

if (isCli) {
  const checkOnly = process.argv.includes('--check')
  try {
    const changed = await generateIconCatalog({ check: checkOnly })
    if (!checkOnly) {
      console.log(
        changed
          ? `Generated ${path.relative(ROOT, GENERATED_ICON_CATALOG_PATH)}`
          : `${path.relative(ROOT, GENERATED_ICON_CATALOG_PATH)} is already current`,
      )
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
}
