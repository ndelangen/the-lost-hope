import { createFileRoute, notFound, redirect, stripSearchParams } from '@tanstack/react-router'

import { LibraryBrowse } from '#/components/library/library-browse'
import {
  isLibraryType,
  type LibraryIndexLoad,
  librarySearch,
  libraryTypes,
  MERGED_LIBRARY_TYPES,
} from '#/lib/published-library-routing'

export const Route = createFileRoute('/library/$type/')({
  validateSearch: librarySearch,
  search: { middlewares: [stripSearchParams(librarySearch({}))] },
  beforeLoad: async ({ params: { type }, search }) => {
    const merged = MERGED_LIBRARY_TYPES[type]
    if (merged) throw redirect({ to: '/library/$type', params: { type: merged }, search })
    const { libraryBrowseTypes } = await import('#/lib/published-library')
    if (!isLibraryType(type) || !libraryBrowseTypes(Boolean(search.dm)).has(type)) throw notFound()
    return { libraryType: type }
  },
  // Only the type shown loads its index.
  loader: async ({ context: { libraryType } }): Promise<LibraryIndexLoad> => {
    const { loadLibraryIndex } = await import('#/lib/published-library-data')
    await loadLibraryIndex([libraryType])
    return { libraryIndex: [libraryType] }
  },
  head: ({ match }) => ({
    meta: [
      {
        title: match.context.libraryType
          ? libraryTypes[match.context.libraryType] + ' | The Lost Hope Library'
          : 'Library | The Lost Hope',
      },
      ...(match.search.dm ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
  }),
  component: LibraryTypePage,
})

function LibraryTypePage() {
  const { libraryType } = Route.useRouteContext()
  const { dm, q, group, page } = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <LibraryBrowse
      type={libraryType}
      dm={dm}
      q={q}
      group={group}
      page={page}
      onSearch={(query, nextGroup) => void navigate({ search: { dm, q: query, group: nextGroup } })}
      onPage={(nextPage) =>
        void navigate({ search: { dm, q, group, page: nextPage === 1 ? undefined : nextPage } })
      }
    />
  )
}
