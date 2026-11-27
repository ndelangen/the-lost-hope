declare module 'virtual:library-index' {
  import type { LibraryIndexRecord, LibraryType } from '#/lib/published-library-data'

  /** Every type the catalog holds, and those with entries a player may see. */
  export const types: readonly LibraryType[]
  export const playerTypes: readonly LibraryType[]
  /** The rules, whole: rules text links to them from every library page. */
  export const rules: readonly LibraryIndexRecord[]
  /** Every other type's entries, one module per type. */
  export const indexLoaders: Readonly<
    Partial<Record<LibraryType, () => Promise<{ default: readonly LibraryIndexRecord[] }>>>
  >
  export const detailLoaders: Readonly<
    Record<string, () => Promise<{ default: Readonly<Record<string, unknown>> }>>
  >
  /** `[type/slug, player words, DM words]` for every entry but the rules. */
  export const loadSearch: () => Promise<{ default: readonly [string, string, string][] }>
}
