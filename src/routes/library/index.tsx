import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import { LibraryBrowse } from '#/components/library/library-browse'
import { type LibraryIndexLoad, librarySearch } from '#/lib/published-library-routing'

export const Route = createFileRoute('/library/')({
  validateSearch: librarySearch,
  search: { middlewares: [stripSearchParams(librarySearch({}))] },
  // The overview browses every type.
  loader: async (): Promise<LibraryIndexLoad> => {
    const { libraryCatalogTypes, loadLibraryIndex } = await import('#/lib/published-library-data')
    await loadLibraryIndex(libraryCatalogTypes)
    return { libraryIndex: libraryCatalogTypes }
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
  const navigate = Route.useNavigate()
  return (
    <LibraryBrowse
      dm={dm}
      q={q}
      page={page}
      onPage={(nextPage) =>
        void navigate({ search: { dm, q, page: nextPage === 1 ? undefined : nextPage } })
      }
      onSearch={(query) => void navigate({ search: { dm, q: query } })}
    />
  )
}
