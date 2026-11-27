import { Link } from '@tanstack/react-router'
import { ArrowLeft, BookOpen, ImageOff } from 'lucide-react'
import { useEffect, useState } from 'react'

import { LibraryImage } from '#/components/library/library-image'
import { SearchInput } from '#/components/ui/search-input'
import {
  libraryBrowseTypes,
  libraryBrowseView,
  loadLibraryIndex,
  loadLibrarySearch,
  type LibraryBrowseView,
} from '#/lib/published-library'
import { isLibraryType, libraryTypes, type LibraryType } from '#/lib/published-library-routing'

import { LibraryAttribution } from './library-attribution'

const control =
  'border-border bg-background hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm'
const selected = 'border-primary bg-primary/10 text-foreground'

export function LibraryBrowse({
  dm,
  q,
  type,
  group,
  page,
  view: loadedView,
  onSearch,
  onPage,
}: {
  dm?: true
  q?: string
  type?: LibraryType
  group?: string
  page?: number
  /** The page of results the route's loader built, without printed-text matches. */
  view: LibraryBrowseView
  onSearch: (query: string | undefined, group: string | undefined) => void
  onPage: (page: number) => void
}) {
  // The page hydrates from the results its loader built, so it needs no library index first. A
  // search then widens to matches inside printed text once the index and search words load.
  const [widened, setWidened] = useState<{ for: LibraryBrowseView; view: LibraryBrowseView }>()
  useEffect(() => {
    if (!q) return
    let current = true
    const query = { dm: Boolean(dm), q, type, group, page }
    void Promise.all([
      loadLibraryIndex(type ? [type] : undefined),
      loadLibrarySearch(Boolean(dm)),
    ]).then(() => {
      if (current) setWidened({ for: loadedView, view: libraryBrowseView(query, true) })
    })
    return () => {
      current = false
    }
  }, [loadedView, dm, q, type, group, page])
  const view = q && widened?.for === loadedView ? widened.view : loadedView
  const { sections, total, pageCount, currentPage, pending, groups } = view
  const availableTypes = libraryBrowseTypes(Boolean(dm))

  return (
    <div className="grid min-w-0 gap-5">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          <BookOpen aria-hidden="true" className="text-muted-foreground size-7" />
          {type ? libraryTypes[type] : 'Library'}
        </h1>
        {dm &&
          (type && libraryBrowseTypes(false).has(type) ? (
            <Link
              to="/library/$type"
              params={{ type }}
              search={{ q, group }}
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
      <nav aria-label="Library categories" className="flex flex-wrap gap-2">
        <Link
          to="/library"
          search={{ dm, q }}
          className={control}
          activeProps={{ className: selected }}
          activeOptions={{ exact: true, includeSearch: false }}
        >
          All entries
        </Link>
        {Object.entries(libraryTypes).map(([category, label]) => {
          if (!isLibraryType(category) || !availableTypes.has(category)) return null
          return (
            <Link
              key={category}
              to="/library/$type"
              params={{ type: category }}
              search={{ dm, q }}
              className={control}
              activeProps={{ className: selected }}
              activeOptions={{ exact: true, includeSearch: false }}
            >
              {label}
            </Link>
          )
        })}
        <Link to="/library/spells" search={{ dm }} className={control}>
          Spells
        </Link>
      </nav>
      <search>
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            const form = new FormData(event.currentTarget)
            const query = form.get('q')
            const selectedGroup = form.get('group')
            onSearch(
              typeof query === 'string' ? query.trim() || undefined : undefined,
              typeof selectedGroup === 'string' ? selectedGroup || undefined : undefined,
            )
          }}
        >
          <div className="grid min-w-48 flex-1 gap-1.5">
            <label htmlFor="library-query" className="text-sm font-medium">
              Search the library
            </label>
            <SearchInput
              id="library-query"
              key={q ?? ''}
              name="q"
              maxLength={200}
              defaultValue={q ?? ''}
            />
          </div>
          <button type="submit" className={control}>
            Search
          </button>
          {q && (
            <button type="button" className={control} onClick={() => onSearch(undefined, group)}>
              Clear search
            </button>
          )}
          {groups.length > 1 && (
            <div className="grid gap-1.5">
              <label htmlFor="library-group" className="text-sm font-medium">
                {type === 'items' ? 'Shop type' : 'Group'}
              </label>
              <select
                id="library-group"
                name="group"
                key={group ?? ''}
                defaultValue={group ?? ''}
                onChange={(event) => {
                  const form = event.target.form
                  const query = form && new FormData(form).get('q')
                  onSearch(
                    typeof query === 'string' ? query.trim() || undefined : q,
                    event.target.value || undefined,
                  )
                }}
                className={control + ' max-w-56'}
              >
                <option value="">{type === 'items' ? 'All shops' : 'All groups'}</option>
                {group && !groups.includes(group) && <option value={group}>{group}</option>}
                {groups.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </form>
      </search>
      <output className="text-muted-foreground text-sm">
        {pending ? (
          'Searching…'
        ) : (
          <>
            {total.toLocaleString()} {total === 1 ? 'entry' : 'entries'}
            {pageCount > 1 && ` · Page ${currentPage} of ${pageCount}`}
          </>
        )}
      </output>
      {!total && !pending && <p>Try another search or group.</p>}
      {sections.map(({ label, entries: cards }) => (
        <section key={label} className="grid gap-3">
          <h2 className="text-xl font-semibold">{label}</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
            {cards.map((entry) => (
              <li className="min-w-0" key={entry.type + '/' + entry.slug}>
                <Link
                  to="/library/$type/$slug"
                  params={{ type: entry.type, slug: entry.slug }}
                  search={{
                    dm,
                    q,
                    group,
                    page: currentPage > 1 ? currentPage : undefined,
                    from: type ? undefined : 'all',
                  }}
                  className="border-border bg-card hover:border-primary focus-visible:border-primary flex h-full min-w-0 flex-col overflow-hidden rounded-lg border transition-colors"
                >
                  {entry.art ? (
                    <LibraryImage
                      src={entry.art.file}
                      alt=""
                      sizes="(min-width: 1280px) 156px, (min-width: 768px) 22vw, 46vw"
                      maxWidth={384}
                      loading="lazy"
                      className="bg-muted aspect-square w-full object-contain"
                    />
                  ) : entry.type !== 'rules' && entry.type !== 'ideas' ? (
                    <div
                      aria-hidden="true"
                      className="bg-muted text-muted-foreground grid aspect-square place-items-center"
                    >
                      <ImageOff className="size-6" />
                    </div>
                  ) : null}
                  <div className="grid gap-1 p-3">
                    <h3 className="text-sm font-semibold break-words">{entry.name}</h3>
                    {entry.price && (
                      <span className="text-muted-foreground text-xs">{entry.price}</span>
                    )}
                    {entry.summary && (
                      <p className="text-muted-foreground line-clamp-3 text-xs">{entry.summary}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {pageCount > 1 && (
        <nav aria-label="Library results" className="flex items-center justify-between gap-3">
          {currentPage > 1 ? (
            <button type="button" onClick={() => onPage(currentPage - 1)} className={control}>
              <ArrowLeft aria-hidden="true" className="size-4" /> Previous
            </button>
          ) : (
            <span />
          )}
          {currentPage < pageCount && (
            <button type="button" onClick={() => onPage(currentPage + 1)} className={control}>
              Next
            </button>
          )}
        </nav>
      )}
      <LibraryAttribution versions={['srd-5-1', 'srd-5-2-1']} />
    </div>
  )
}
