declare module 'virtual:library-index' {
  import type { LibraryIndexRecord } from '#/lib/published-library-data'

  export const records: readonly LibraryIndexRecord[]
  export const detailLoaders: Readonly<
    Record<string, () => Promise<{ default: Readonly<Record<string, unknown>> }>>
  >
  /** `[type/slug, player words, DM words]` for every entry but the rules. */
  export const loadSearch: () => Promise<{ default: readonly [string, string, string][] }>
}
