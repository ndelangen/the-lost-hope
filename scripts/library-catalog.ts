import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

import type { Plugin } from 'vite'

const ROOT = path.resolve(import.meta.dirname, '..')
const CATALOG_DIR = path.join(ROOT, 'src/lib/published-library-catalog')
const CATALOG_FILES = ['entries', 'monsters-a-f', 'monsters-g-p', 'monsters-q-z'].map((name) =>
  path.join(CATALOG_DIR, `${name}.json`),
)

const INDEX = 'virtual:library-index'
const DETAIL = 'virtual:library-detail/'
const SEARCH = 'virtual:library-search'

type Section = { title: string; lines: string[] }
type Printing = { id: string; gm?: Section[]; player?: Section[]; [field: string]: unknown }
type Record = { type: string; slug: string; printings: Printing[]; [field: string]: unknown }

/** Detail modules group entries by type and first letter, so a page loads only a small part. */
function bucketOf({ type, slug }: Pick<Record, 'type' | 'slug'>) {
  return `${type}-${/^[a-z]/u.test(slug) ? slug[0] : '0'}`
}

/** Lowercase, accent-free, deduplicated words: what library search matches against. */
function words(texts: Iterable<string>) {
  const found = new Set<string>()
  for (const text of texts)
    for (const word of text
      .normalize('NFKD')
      .replaceAll(/\p{M}/gu, '')
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u))
      if (word) found.add(word)
  return [...found].join(' ')
}

/**
 * The words of each typed magic item or piece of equipment, by key, read from one library
 * folder's string literals: a typed printing's rules live there, not in the catalog, and search
 * still finds them.
 */
function typedWords(folder: string) {
  const dir = path.join(ROOT, 'src/data/library', folder)
  const found = new Map<string, string[]>()
  for (const file of readdirSync(dir).filter(
    (name) => name.endsWith('.ts') && name !== '_index.ts',
  )) {
    const source = readFileSync(path.join(dir, file), 'utf8')
    for (const block of source.split(/\n {2}(?=[a-z0-9_]+: \{\n)/u).slice(1)) {
      const key = block.slice(0, block.indexOf(':'))
      const strings = [...block.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/gu)].map(
        (match) => match[1] ?? match[2] ?? '',
      )
      found.set(key, strings)
    }
  }
  return found
}

const sectionText = (sections: Section[] = []) =>
  sections.flatMap(({ title, lines }) => [title, ...lines])

function build() {
  const records = CATALOG_FILES.flatMap(
    (file) => JSON.parse(readFileSync(file, 'utf8')) as Record[],
  )
  const details = new Map<string, Map<string, unknown>>()
  const search: [string, string, string][] = []
  const typedItems = typedWords('magic-items')
  const typedEquipment = typedWords('equipment')
  const typedText = (printings: Printing[]) =>
    printings.flatMap(({ typed }) => {
      const ref = typed as { magicItem?: { key: string }; equipment?: { key: string } } | undefined
      if (ref?.magicItem) return typedItems.get(ref.magicItem.key) ?? []
      if (ref?.equipment) return typedEquipment.get(ref.equipment.key) ?? []
      return []
    })
  const index = records.map((record) => {
    // Rules stay whole in the index: rules text links to them from every library page.
    if (record.type === 'rules') return record
    const bucket = bucketOf(record)
    const sections = details.get(bucket) ?? new Map<string, unknown>()
    sections.set(
      record.slug,
      Object.fromEntries(record.printings.map(({ id, gm, player }) => [id, { gm, player }])),
    )
    details.set(bucket, sections)
    search.push([
      `${record.type}/${record.slug}`,
      words([
        ...record.printings.flatMap(({ player }) => sectionText(player)),
        ...typedText(record.printings),
      ]),
      words(record.printings.flatMap(({ gm }) => sectionText(gm))),
    ])
    return {
      ...record,
      printings: record.printings.map(({ gm: _, player: __, ...printing }) => printing),
    }
  })
  return { index, details, search }
}

/**
 * Serves the published library catalog as small modules instead of importing its 35 MB of JSON:
 * an index for browsing, the words search matches (loaded once someone searches), and per-type,
 * per-letter detail modules loaded with the entry page. Neither the dev server nor the browser has to hold the whole catalog.
 */
export function libraryCatalogPlugin(): Plugin {
  let cache: ReturnType<typeof build> | undefined
  const catalog = () => (cache ??= build())

  return {
    name: 'library-catalog',
    resolveId(id) {
      return id === INDEX || id === SEARCH || id.startsWith(DETAIL) ? '\0' + id : undefined
    },
    load(id) {
      if (id === '\0' + INDEX) {
        for (const file of CATALOG_FILES) this.addWatchFile(file)
        const { index, details } = catalog()
        const loaders = [...details.keys()]
          .toSorted()
          .map((bucket) => `  ${JSON.stringify(bucket)}: () => import('${DETAIL}${bucket}'),`)
        return `export const records = ${JSON.stringify(index)}\nexport const detailLoaders = {\n${loaders.join('\n')}\n}\nexport const loadSearch = () => import('${SEARCH}')\n`
      }
      if (id === '\0' + SEARCH) {
        for (const file of CATALOG_FILES) this.addWatchFile(file)
        return `export default ${JSON.stringify(catalog().search)}\n`
      }
      if (id.startsWith('\0' + DETAIL)) {
        for (const file of CATALOG_FILES) this.addWatchFile(file)
        const bucket = id.slice(DETAIL.length + 1)
        return `export default ${JSON.stringify(Object.fromEntries(catalog().details.get(bucket) ?? []))}\n`
      }
      return undefined
    },
    watchChange(id) {
      if (CATALOG_FILES.includes(id)) cache = undefined
    },
  }
}

export { bucketOf as libraryDetailBucket }
