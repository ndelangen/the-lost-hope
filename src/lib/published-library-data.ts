import catalog from './published-library-catalog.json'
import type { LibraryType } from './published-library-routing'
import type { AbilityKind } from './stat-block'

export type { LibraryType } from './published-library-routing'
export type SrdVersion = 'srd-5-1' | 'srd-5-2-1'
export type LibrarySection = { title: string; lines: readonly string[] }
export type LibraryAbilityDisplay = Readonly<Record<string, { icon: string; kind: AbilityKind }>>

type LibraryPrinting = {
  id: SrdVersion | 'original'
  label: string
  player?: readonly LibrarySection[]
  gm: readonly LibrarySection[]
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
  art?: readonly { file: string; credit: string }[]
  gmOnly?: boolean
  printings: readonly [LibraryPrinting, ...LibraryPrinting[]]
}

export const publishedLibrary = catalog as unknown as readonly LibraryRecord[]
