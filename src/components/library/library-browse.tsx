import { Link } from '@tanstack/react-router'
import { BookOpen, Search } from 'lucide-react'

import { LibraryAttribution } from '#/components/library/library-attribution'
import {
  browseLibrary,
  isLibraryType,
  libraryBrowseTypes,
  libraryTypes,
  type LibraryType,
} from '#/lib/published-library'

export function LibraryBrowse({
  dm,
  q,
  type,
  onSearch,
}: {
  dm?: true
  q?: string
  type?: LibraryType
  onSearch: (query: string | undefined) => void
}) {
  const entries = browseLibrary(Boolean(dm), q, type)
  const availableTypes = libraryBrowseTypes(Boolean(dm))

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-6 px-5 py-10 sm:px-8">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="flex items-center gap-3 text-3xl font-semibold">
          <BookOpen aria-hidden="true" className="size-7" />
          {type ? libraryTypes[type] : 'Library'}
        </h1>
        {dm &&
          (type && libraryBrowseTypes(false).has(type) ? (
            <Link
              to="/library/$type"
              params={{ type }}
              search={{ q }}
              className="text-sm underline"
            >
              Return to player view
            </Link>
          ) : (
            <Link to="/library" search={{ q }} className="text-sm underline">
              Return to player view
            </Link>
          ))}
      </header>
      <search>
        <form
          className="border-border bg-card flex items-center gap-3 rounded-lg border px-4 py-2"
          onSubmit={(event) => {
            event.preventDefault()
            const value = new FormData(event.currentTarget).get('q')
            onSearch(typeof value === 'string' ? value.trim() : undefined)
          }}
        >
          <Search aria-hidden="true" className="text-muted-foreground size-4 shrink-0" />
          <label htmlFor="library-query" className="sr-only">
            Search the library
          </label>
          <input
            id="library-query"
            key={q ?? ''}
            name="q"
            type="search"
            className="min-w-0 flex-1 bg-transparent"
            defaultValue={q ?? ''}
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
          search={{ dm, q }}
          className="border-border rounded-md border px-3 py-1.5 text-sm"
          activeProps={{ className: 'bg-accent font-semibold' }}
          activeOptions={{ exact: true }}
        >
          All
        </Link>
        {Object.entries(libraryTypes).map(([type, label]) => {
          if (!isLibraryType(type) || !availableTypes.has(type)) return null
          return (
            <Link
              key={type}
              to="/library/$type"
              params={{ type }}
              search={{ dm, q }}
              className="border-border rounded-md border px-3 py-1.5 text-sm"
              activeProps={{ className: 'bg-accent font-semibold' }}
              activeOptions={{ exact: true }}
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
                search={{ dm, q }}
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
