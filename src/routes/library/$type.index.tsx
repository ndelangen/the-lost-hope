import { createFileRoute, notFound, redirect, stripSearchParams } from '@tanstack/react-router'

import { LibraryBrowse } from '#/components/library/library-browse'
import {
  isLibraryType,
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
  loaderDeps: ({ search: { dm, q, group, page } }) => ({ dm, q, group, page }),
  // The page's results are built here, so the browser hydrates without the type's whole index.
  loader: async ({ context: { libraryType }, deps }) => {
    const library = await import('#/lib/published-library')
    await library.loadLibraryIndex([libraryType])
    const query = { ...deps, dm: Boolean(deps.dm), type: libraryType }
    const printedText = typeof window !== 'undefined' && library.libraryTextSearchLoaded(query.dm)
    return { view: library.libraryBrowseView(query, printedText) }
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
  const { view } = Route.useLoaderData()
  const { dm, q, group, page } = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <LibraryBrowse
      type={libraryType}
      dm={dm}
      q={q}
      group={group}
      page={page}
      view={view}
      onSearch={(query, nextGroup) => void navigate({ search: { dm, q: query, group: nextGroup } })}
      onPage={(nextPage) =>
        void navigate({ search: { dm, q, group, page: nextPage === 1 ? undefined : nextPage } })
      }
    />
  )
}
