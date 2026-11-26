import type { EntityRef } from '#/definitions/kind'

import entries from './published-library-catalog/entries.json'
import monstersAtoF from './published-library-catalog/monsters-a-f.json'
import monstersGtoP from './published-library-catalog/monsters-g-p.json'
import monstersQtoZ from './published-library-catalog/monsters-q-z.json'
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

export const publishedLibrary = [
  ...entries,
  ...monstersAtoF,
  ...monstersGtoP,
  ...monstersQtoZ,
] as unknown as readonly LibraryRecord[]
