import { createFileRoute, Link, notFound, stripSearchParams } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { LibraryAttribution } from '#/components/library/library-attribution'
import { LibraryCreatureSheet } from '#/components/library/library-creature-sheet'
import { LibraryGallery } from '#/components/library/library-gallery'
import { LibraryRuleText } from '#/components/library/library-rule-text'
import { isLibraryType, librarySearch, libraryTypes } from '#/lib/published-library-routing'

export const Route = createFileRoute('/library/$type/$slug')({
  validateSearch: librarySearch,
  search: { middlewares: [stripSearchParams(librarySearch({}))] },
  beforeLoad: async ({ params, search }) => {
    const { type, slug } = params
    if (!isLibraryType(type)) throw notFound()
    const { getLibraryEntry } = await import('#/lib/published-library')
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

  const printings =
    entry.printings.length > 1 ? (
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
                ? 'border-primary bg-primary/10 rounded-md border px-3 py-1.5 text-sm font-semibold'
                : 'border-border hover:bg-muted rounded-md border px-3 py-1.5 text-sm'
            }
          >
            {label}
          </Link>
        ))}
      </nav>
    ) : null
  const sources = (
    <section id="sheet-sources" className="border-border grid scroll-mt-20 gap-2 border-t pt-4">
      <h2 className="text-sm font-semibold">Sources</h2>
      {entry.selected.artReference && (
        <a className="text-primary w-fit text-sm underline" href={entry.selected.artReference}>
          Publisher artwork reference
        </a>
      )}
      {entry.relatedType && (
        <Link
          to="/library/$type/$slug"
          params={{ type: entry.relatedType, slug: params.slug }}
          search={{ dm: search.dm, q: search.q }}
          className="text-primary w-fit text-sm underline"
        >
          See the {entry.relatedType === 'beasts' ? 'beast' : 'monster'} entry
        </Link>
      )}
      {entry.selected.id === 'original' ? (
        <p className="text-muted-foreground text-sm">{entry.selected.label}</p>
      ) : (
        <LibraryAttribution versions={[entry.selected.id]} />
      )}
    </section>
  )

  return (
    <div className="grid min-w-0 gap-5">
      <div className="flex flex-wrap justify-between gap-3 text-sm">
        {search.from === 'all' ? (
          <Link
            to="/library"
            search={{ dm: search.dm, q: search.q, page: search.page }}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to results
          </Link>
        ) : (
          <Link
            to="/library/$type"
            params={{ type }}
            search={{ dm: search.dm, q: search.q, group: search.group, page: search.page }}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to results
          </Link>
        )}
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
      {type === 'beasts' || type === 'monsters' ? (
        <LibraryCreatureSheet
          entry={entry}
          category={libraryTypes[type]}
          search={search}
          printings={printings}
          sources={sources}
        />
      ) : (
        <article className="grid min-w-0 gap-5">
          <header className="grid gap-1">
            <p className="text-muted-foreground text-sm">
              {type === 'rules' ? entry.group : libraryTypes[type]}
            </p>
            <h1 className="text-3xl font-bold break-words">{entry.name}</h1>
            {entry.price && <p className="font-semibold">{entry.price}</p>}
          </header>
          <div
            className={`grid min-w-0 gap-6 ${entry.art?.length ? 'md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]' : ''}`}
          >
            {entry.art?.length ? (
              <LibraryGallery key={entry.art[0].file} images={entry.art} name={entry.name} />
            ) : null}
            <div className="grid min-w-0 content-start gap-4">
              {type === 'items' && (
                <div className="flex flex-wrap gap-2">
                  {entry.groups.map((group) => (
                    <span key={group} className="bg-muted rounded-md px-2 py-1 text-sm">
                      {group}
                    </span>
                  ))}
                </div>
              )}
              {entry.summary && <p className="whitespace-pre-line">{entry.summary}</p>}
              {entry.rating && (
                <p className="text-muted-foreground text-sm">
                  Cool {entry.rating.cool}/5 · Useful {entry.rating.useful}/5
                </p>
              )}
              {printings}
              {entry.sections.map((section) => (
                <section key={section.title + ':' + section.lines[0]} className="grid gap-2">
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                  {[...new Set(section.lines)].map((line) => (
                    <p key={line} className="text-sm whitespace-pre-line">
                      {type === 'rules' ? (
                        line
                      ) : (
                        <LibraryRuleText line={line} search={search} version={entry.selected.id} />
                      )}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
          {sources}
        </article>
      )}
    </div>
  )
}
