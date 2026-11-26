declare module 'virtual:library-index' {
  import type { LibraryIndexRecord } from '#/lib/published-library-data'

  export const records: readonly LibraryIndexRecord[]
  export const detailLoaders: Readonly<
    Record<string, () => Promise<{ default: Readonly<Record<string, unknown>> }>>
  >
}
