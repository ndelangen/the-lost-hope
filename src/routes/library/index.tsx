import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import { LibraryBrowse } from '#/components/library/library-browse'
import { librarySearch } from '#/lib/published-library'

export const Route = createFileRoute('/library/')({
  validateSearch: librarySearch,
  search: { middlewares: [stripSearchParams(librarySearch({}))] },
  head: ({ match }) => ({
    meta: [
      { title: 'Library | The Lost Hope' },
      ...(match.search.dm ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
  }),
  component: LibraryPage,
})

function LibraryPage() {
  const { dm, q } = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <LibraryBrowse
      dm={dm}
      q={q}
      onSearch={(query) => void navigate({ search: { dm, q: query } })}
    />
  )
}
