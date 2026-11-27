import {
  detailLoaders,
  indexLoaders,
  loadSearch,
  playerTypes,
  rules,
  types,
} from 'virtual:library-index'

import type { EntityRef } from '#/definitions/kind'

import type { LibraryType } from './published-library-routing'
import type { AbilityKind } from './stat-block'

export type { LibraryType } from './published-library-routing'
export type SrdVersion = 'srd-5-1' | 'srd-5-2-1'
export type LibrarySection = { title: string; lines: readonly string[] }
export type LibraryAbilityDisplay = Readonly<Record<string, { icon: string; kind: AbilityKind }>>

type LibraryArt = { file: string; credit: string }

type LibraryPrinting = {
  id: string
  label: string
  edition?: string
  variantName?: string
  status?: string
  source?: string
  art?: readonly LibraryArt[]
  player?: readonly LibrarySection[]
  gm?: readonly LibrarySection[]
  /** A printing converted to typed data: its statistics live in `src/data/library`, not here. */
  typed?:
    | { monster: EntityRef<'monster'>; publication: EntityRef<'publication'> }
    | { magicItem: EntityRef<'magicItem'>; publication: EntityRef<'publication'> }
    | { equipment: EntityRef<'equipment'>; publication: EntityRef<'publication'> }
  /** The open-licensed publication whose text this printing shows, for its notice. */
  publication?: EntityRef<'publication'>
  artReference?: string
  abilityDisplay?: LibraryAbilityDisplay
}
type LibraryRecord = {
  type: LibraryType
  slug: string
  name: string
  summary: string
  group: string
  groups?: readonly string[]
  price?: string
  rating?: { cool: number; useful: number }
  art?: readonly LibraryArt[]
  gmOnly?: boolean
  printings: readonly [LibraryPrinting, ...LibraryPrinting[]]
}

/**
 * A catalog entry as the index serves it: everything but the printings' text sections, which load
 * with the entry (`loadLibraryDetail`). Rules arrive whole.
 */
export type LibraryIndexRecord = LibraryRecord

/** The types the catalog holds, and those with entries a player may see. */
export const libraryCatalogTypes: readonly LibraryType[] = types
export const libraryPlayerTypes: readonly LibraryType[] = playerTypes

/** Each loaded type's entries, by slug. The rules always load: rules text links to them. */
const indexes = new Map<LibraryType, ReadonlyMap<string, LibraryIndexRecord>>()

function addIndex(type: LibraryType, records: readonly LibraryIndexRecord[]) {
  const bySlug = new Map(records.map((record) => [record.slug, record]))
  if (bySlug.size !== records.length) throw new Error(`Duplicate published library ${type} slug`)
  indexes.set(type, bySlug)
}
addIndex('rules', rules)

/**
 * Load the browsing index of some types (all of them when none are named) before reading them with
 * `libraryRecords` or `libraryRecord`. Each type's index loads once, on its own.
 */
export async function loadLibraryIndex(wanted: readonly LibraryType[] = types) {
  await Promise.all(
    wanted
      .filter((type) => !indexes.has(type))
      .map(async (type) => {
        const load = indexLoaders[type]
        if (!load) throw new Error(`The library holds no ${type}`)
        const { default: records } = await load()
        if (!indexes.has(type)) addIndex(type, records)
      }),
  )
}

function loadedIndex(type: LibraryType) {
  const index = indexes.get(type)
  if (!index) throw new Error(`Load the library's ${type} with loadLibraryIndex first`)
  return index
}

/** The loaded entries of some types (all of them when none are named), type by type. */
export function libraryRecords(wanted: readonly LibraryType[] = types): LibraryIndexRecord[] {
  return wanted.flatMap((type) => [...loadedIndex(type).values()])
}

/** One entry of a loaded type. */
export function libraryRecord(type: LibraryType, slug: string): LibraryIndexRecord | undefined {
  return loadedIndex(type).get(slug)
}

type Detail = Readonly<Record<string, { gm?: LibrarySection[]; player?: LibrarySection[] }>>

const loaded = new Set<string>()

/** Detail modules group entries by type and first letter (see scripts/library-catalog.ts). */
function bucketOf({ type, slug }: { type: string; slug: string }) {
  return `${type}-${/^[a-z]/u.test(slug) ? slug[0] : '0'}`
}

/** A detail bucket's type: the part of its name before the letter. */
const bucketType = (bucket: string) => bucket.slice(0, bucket.lastIndexOf('-')) as LibraryType

async function loadBucket(bucket: string) {
  if (loaded.has(bucket)) return
  const load = detailLoaders[bucket]
  if (!load) return
  const type = bucketType(bucket)
  const [{ default: detail }] = (await Promise.all([load(), loadLibraryIndex([type])])) as [
    { default: Readonly<Record<string, Detail>> },
    void,
  ]
  for (const record of loadedIndex(type).values()) {
    const printings = bucketOf(record) === bucket && detail[record.slug]
    if (!printings) continue
    for (const printing of record.printings) Object.assign(printing, printings[printing.id])
  }
  loaded.add(bucket)
}

/** Load an entry's index record and printed text before reading it with `getLibraryEntry`. */
export async function loadLibraryDetail(type: LibraryType, slug: string) {
  await Promise.all([loadLibraryIndex([type]), loadBucket(bucketOf({ type, slug }))])
}

/** The words each entry's printed text holds, by `type/slug`, once `loadLibrarySearch` ran. */
export const searchWords = new Map<string, { player: string; gm: string }>()

/** Whether search can match printed text yet. */
export function libraryTextSearchLoaded() {
  return searchWords.size > 0
}

/** Load what search matches in printed text; browsing without a query does not need it. */
export async function loadLibrarySearch() {
  if (searchWords.size) return
  const { default: search } = await loadSearch()
  for (const [path, player, gm] of search) searchWords.set(path, { player, gm })
}

/** Load every entry and its printed text, for tests and scripts that read the whole catalog. */
export async function loadAllLibraryDetails() {
  await loadLibraryIndex()
  await Promise.all(Object.keys(detailLoaders).map(loadBucket))
}
