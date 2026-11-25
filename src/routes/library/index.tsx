import { createFileRoute, Link, stripSearchParams } from '@tanstack/react-router'
import { BookOpen, Search } from 'lucide-react'

import { LibraryAttribution } from '#/components/library/library-attribution'
import { browseLibrary, isLibraryType, librarySearch, libraryTypes } from '#/lib/published-library'

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
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const entries = browseLibrary(Boolean(search.dm), search.q, search.type)
  const availableTypes = new Set(browseLibrary(Boolean(search.dm)).map((entry) => entry.type))

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-6 px-5 py-10 sm:px-8">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="flex items-center gap-3 text-3xl font-semibold">
          <BookOpen aria-hidden="true" className="size-7" />
          Library
        </h1>
        {search.dm && (
          <Link to="/library" search={{ ...search, dm: undefined }} className="text-sm underline">
            Return to player view
          </Link>
        )}
      </header>
      <search>
        <form
          className="border-border bg-card flex items-center gap-3 rounded-lg border px-4 py-2"
          onSubmit={(event) => {
            event.preventDefault()
            const q = new FormData(event.currentTarget).get('q')
            void navigate({
              search: { ...search, q: typeof q === 'string' ? q.trim() : undefined },
            })
          }}
        >
          <Search aria-hidden="true" className="text-muted-foreground size-4 shrink-0" />
          <label htmlFor="library-query" className="sr-only">
            Search the library
          </label>
          <input
            id="library-query"
            key={search.q ?? ''}
            name="q"
            type="search"
            className="min-w-0 flex-1 bg-transparent"
            defaultValue={search.q ?? ''}
            placeholder="Search the library"
          />
          <button type="submit" className="bg-accent rounded-md px-3 py-1.5 text-sm font-medium">
            Search
          </button>
        </form>
      </search>
      <nav aria-label="Entry types" className="flex flex-wrap gap-2">
        <Link
          to="/library"
          search={{ ...search, type: undefined }}
          className="border-border rounded-md border px-3 py-1.5 text-sm"
          activeProps={{ className: 'bg-accent font-semibold' }}
          activeOptions={{ exact: true, includeSearch: true, explicitUndefined: true }}
        >
          All
        </Link>
        {Object.entries(libraryTypes).map(([type, label]) => {
          if (!isLibraryType(type) || !availableTypes.has(type)) return null
          return (
            <Link
              key={type}
              to="/library"
              search={{ ...search, type }}
              className="border-border rounded-md border px-3 py-1.5 text-sm"
              activeProps={{ className: 'bg-accent font-semibold' }}
              activeOptions={{ exact: true, includeSearch: true }}
            >
              {label}
            </Link>
          )
        })}
      </nav>
      {entries.length ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {entries.map((entry) => (
            <li key={entry.type + '/' + entry.slug}>
              <Link
                to="/library/$type/$slug"
                params={{ type: entry.type, slug: entry.slug }}
                search={{ dm: search.dm }}
                className="border-border bg-card hover:bg-accent grid h-full gap-2 rounded-lg border p-5"
              >
                <span className="text-muted-foreground text-sm">{libraryTypes[entry.type]}</span>
                <h2 className="text-lg font-semibold">{entry.name}</h2>
                <p className="text-muted-foreground text-sm">{entry.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No matching entries.</p>
      )}
      <LibraryAttribution versions={['srd-5-1', 'srd-5-2-1']} />
    </main>
  )
}
