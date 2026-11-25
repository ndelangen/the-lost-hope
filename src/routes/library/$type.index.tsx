import { createFileRoute, notFound, stripSearchParams } from '@tanstack/react-router'

import { LibraryBrowse } from '#/components/library/library-browse'
import {
  isLibraryType,
  libraryBrowseTypes,
  librarySearch,
  libraryTypes,
} from '#/lib/published-library'

export const Route = createFileRoute('/library/$type/')({
  validateSearch: librarySearch,
  search: { middlewares: [stripSearchParams(librarySearch({}))] },
  beforeLoad: ({ params: { type }, search }) => {
    if (!isLibraryType(type) || !libraryBrowseTypes(Boolean(search.dm)).has(type)) throw notFound()
    return { libraryType: type }
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
  const { dm, q } = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <LibraryBrowse
      type={libraryType}
      dm={dm}
      q={q}
      onSearch={(query) => void navigate({ search: { dm, q: query } })}
    />
  )
}
