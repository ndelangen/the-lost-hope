import { detailLoaders, loadSearch, records } from 'virtual:library-index'

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
  typed?: { monster: EntityRef<'monster'>; publication: EntityRef<'publication'> }
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

export const publishedLibrary = records

type Detail = Readonly<Record<string, { gm?: LibrarySection[]; player?: LibrarySection[] }>>

const loaded = new Set<string>()

/** Detail modules group entries by type and first letter (see scripts/library-catalog.ts). */
function bucketOf({ type, slug }: { type: string; slug: string }) {
  return `${type}-${/^[a-z]/u.test(slug) ? slug[0] : '0'}`
}

async function loadBucket(bucket: string) {
  if (loaded.has(bucket)) return
  const load = detailLoaders[bucket]
  if (!load) return
  const { default: detail } = (await load()) as { default: Readonly<Record<string, Detail>> }
  for (const record of records) {
    const printings = record.type !== 'rules' && bucketOf(record) === bucket && detail[record.slug]
    if (!printings) continue
    for (const printing of record.printings) Object.assign(printing, printings[printing.id])
  }
  loaded.add(bucket)
}

/** Load an entry's printed text before reading it with `getLibraryEntry`. */
export function loadLibraryDetail(type: string, slug: string) {
  return loadBucket(bucketOf({ type, slug }))
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

/** Load every entry's printed text, for tests and scripts that read the whole catalog. */
export async function loadAllLibraryDetails() {
  await Promise.all(Object.keys(detailLoaders).map(loadBucket))
}
