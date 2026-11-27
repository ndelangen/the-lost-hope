import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import { LibraryBrowse } from '#/components/library/library-browse'
import { librarySearch } from '#/lib/published-library-routing'

export const Route = createFileRoute('/library/')({
  validateSearch: librarySearch,
  search: { middlewares: [stripSearchParams(librarySearch({}))] },
  loaderDeps: ({ search: { dm, q, page } }) => ({ dm, q, page }),
  // The overview browses every type. Its results are built here, so the browser hydrates without
  // the whole library index.
  loader: async ({ deps }) => {
    const library = await import('#/lib/published-library')
    await library.loadLibraryIndex()
    const query = { ...deps, dm: Boolean(deps.dm) }
    const printedText = typeof window !== 'undefined' && library.libraryTextSearchLoaded(query.dm)
    return { view: library.libraryBrowseView(query, printedText) }
  },
  head: ({ match }) => ({
    meta: [
      { title: 'Library | The Lost Hope' },
      ...(match.search.dm ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
  }),
  component: LibraryPage,
})

function LibraryPage() {
  const { dm, q, page } = Route.useSearch()
  const { view } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  return (
    <LibraryBrowse
      dm={dm}
      q={q}
      page={page}
      view={view}
      onPage={(nextPage) =>
        void navigate({ search: { dm, q, page: nextPage === 1 ? undefined : nextPage } })
      }
      onSearch={(query) => void navigate({ search: { dm, q: query } })}
    />
  )
}
