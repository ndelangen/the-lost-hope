export const libraryTypes = {
  items: 'Items',
  monsters: 'Creatures',
  species: 'Playable species',
  npcs: 'NPCs',
  rules: 'Rules',
  ideas: 'Encounter ideas',
} as const

export type LibraryType = keyof typeof libraryTypes

/** Beasts were a list of their own; they are creatures now, grouped as "Beast". */
export const MERGED_LIBRARY_TYPES: Readonly<Record<string, LibraryType>> = { beasts: 'monsters' }

export function isLibraryType(value: unknown): value is LibraryType {
  return typeof value === 'string' && Object.hasOwn(libraryTypes, value)
}

type LibrarySearch = {
  dm?: true
  from?: 'all'
  q?: string
  group?: string
  page?: number
  version?: string
}

export function librarySearch(input: Record<string, unknown>): LibrarySearch {
  const page = Number(input.page)
  return {
    dm: input.dm === '' || input.dm === true ? (true as const) : undefined,
    from: input.from === 'all' ? 'all' : undefined,
    q: typeof input.q === 'string' ? input.q.slice(0, 200) || undefined : undefined,
    group: typeof input.group === 'string' ? input.group.slice(0, 150) || undefined : undefined,
    page: Number.isSafeInteger(page) && page > 1 ? page : undefined,
    version: typeof input.version === 'string' ? input.version.slice(0, 80) : undefined,
  }
}
