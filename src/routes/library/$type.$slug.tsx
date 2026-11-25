import { createFileRoute, Link, notFound, stripSearchParams } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { LibraryAttribution } from '#/components/library/library-attribution'
import {
  getLibraryEntry,
  isLibraryType,
  librarySearch,
  libraryTypes,
} from '#/lib/published-library'

export const Route = createFileRoute('/library/$type/$slug')({
  validateSearch: librarySearch,
  search: { middlewares: [stripSearchParams(librarySearch({}))] },
  beforeLoad: ({ params, search }) => {
    const { type, slug } = params
    if (!isLibraryType(type)) throw notFound()
    const entry = getLibraryEntry(type, slug, Boolean(search.dm), search.version)
    if (!entry) throw notFound()
    return { entry, type }
  },
  head: ({ match }) => ({
    meta: [
      {
        title: match.context.entry
          ? match.context.entry.name + ' | The Lost Hope Library'
          : 'Library | The Lost Hope',
      },
      ...(match.search.dm ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    ],
  }),
  component: LibraryEntryPage,
})

function LibraryEntryPage() {
  const { entry, type } = Route.useRouteContext()
  const search = Route.useSearch()
  const params = Route.useParams()

  return (
    <main className="mx-auto grid w-full max-w-3xl gap-6 px-5 py-10 sm:px-8">
      <div className="flex flex-wrap justify-between gap-3 text-sm">
        <Link
          to="/library/$type"
          params={{ type }}
          search={{ dm: search.dm, q: search.q }}
          className="inline-flex items-center gap-2 underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to {libraryTypes[type].toLowerCase()}
        </Link>
        {search.dm &&
          (entry.gmOnly ? (
            <Link to="/library" search={{ q: search.q }} className="underline">
              Return to player view
            </Link>
          ) : (
            <Link
              to="/library/$type/$slug"
              params={params}
              search={{ ...search, dm: undefined }}
              className="underline"
            >
              Return to player view
            </Link>
          ))}
      </div>
      <header className="border-border bg-card grid gap-3 rounded-lg border p-6">
        <p className="text-muted-foreground text-sm">{entry.group}</p>
        <h1 className="text-3xl font-semibold">{entry.name}</h1>
        <p>{entry.summary}</p>
      </header>
      {entry.printings.length > 1 && (
        <nav aria-label="Printings" className="flex flex-wrap gap-2">
          {entry.printings.map(({ id, label }) => (
            <Link
              key={id}
              to="/library/$type/$slug"
              params={params}
              search={{ ...search, version: id }}
              aria-current={id === entry.selected.id ? 'page' : undefined}
              className={
                id === entry.selected.id
                  ? 'bg-accent rounded-md px-3 py-1.5 text-sm font-semibold'
                  : 'border-border rounded-md border px-3 py-1.5 text-sm'
              }
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
      {entry.sections.map((section) => (
        <section
          key={section.title}
          className="border-border bg-card grid gap-3 rounded-lg border p-6"
        >
          <h2 className="text-xl font-semibold">{section.title}</h2>
          {section.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>
      ))}
      {entry.selected.id === 'original' ? (
        <p className="text-muted-foreground text-sm">{entry.selected.label}</p>
      ) : (
        <LibraryAttribution versions={[entry.selected.id]} />
      )}
    </main>
  )
}
