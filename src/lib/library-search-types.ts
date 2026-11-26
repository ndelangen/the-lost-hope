import type { LibraryType } from './published-library-routing'

/** What library search browses: the catalog's types plus spells, which have their own pages. */
export const LIBRARY_SEARCH_TYPES = [
  'monsters',
  'items',
  'species',
  'npcs',
  'rules',
  'ideas',
  'spells',
] as const satisfies readonly (LibraryType | 'spells')[]

export type LibrarySearchType = (typeof LIBRARY_SEARCH_TYPES)[number]
