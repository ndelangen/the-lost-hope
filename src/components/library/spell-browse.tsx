import { Link } from '@tanstack/react-router'
import { ArrowLeft, Sparkles } from 'lucide-react'

import { SearchInput } from '#/components/ui/search-input'
import { SPELL_SCHOOLS } from '#/definitions/library'
import { publicationOf } from '#/lib/library-monsters'
import { browseSpells, spellFacets, spellLevelLabel, type SpellFilters } from '#/lib/library-spells'

const resultsPerPage = 60
const control =
  'border-border bg-background hover:bg-muted inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm'

const LEVELS = ['Cantrip', '1', '2', '3', '4', '5', '6', '7', '8', '9']

/** Every spell the library holds, searchable and filtered by level, school, class and book. */
export function SpellBrowse({
  filters,
  page,
  dm,
  onChange,
}: {
  filters: SpellFilters
  page?: number
  dm?: true
  onChange: (filters: SpellFilters, page?: number) => void
}) {
  const results = browseSpells(filters)
  const { classes, books } = spellFacets()
  const pageCount = Math.max(1, Math.ceil(results.length / resultsPerPage))
  const currentPage = Math.min(page ?? 1, pageCount)
  const shown = results.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage)
  const select = (name: keyof SpellFilters, value: string) =>
    onChange({
      ...filters,
      [name]: value === '' ? undefined : name === 'level' ? Number(value) : value,
    })

  return (
    <div className="grid min-w-0 gap-5">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="flex items-center gap-3 text-3xl font-bold">
          <Sparkles aria-hidden="true" className="text-muted-foreground size-7" />
          Spells
        </h1>
        <Link to="/library" search={{ dm }} className="text-sm underline">
          Back to the library
        </Link>
      </header>
      <search>
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            const query = new FormData(event.currentTarget).get('q')
            onChange({
              ...filters,
              q: typeof query === 'string' ? query.trim() || undefined : undefined,
            })
          }}
        >
          <div className="grid min-w-48 flex-1 gap-1.5">
            <label htmlFor="spell-query" className="text-sm font-medium">
              Search spells
            </label>
            <SearchInput
              id="spell-query"
              key={filters.q ?? ''}
              name="q"
              defaultValue={filters.q ?? ''}
            />
          </div>
          <button type="submit" className={control}>
            Search
          </button>
          <label className="grid gap-1.5 text-sm font-medium">
            Level
            <select
              className={control}
              value={filters.level ?? ''}
              onChange={(event) => select('level', event.target.value)}
            >
              <option value="">Any level</option>
              {LEVELS.map((label, level) => (
                <option key={label} value={level}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            School
            <select
              className={control}
              value={filters.school ?? ''}
              onChange={(event) => select('school', event.target.value)}
            >
              <option value="">Any school</option>
              {SPELL_SCHOOLS.map((school) => (
                <option key={school} value={school}>
                  {school.charAt(0).toUpperCase() + school.slice(1)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Class
            <select
              className={control}
              value={filters.spellClass ?? ''}
              onChange={(event) => select('spellClass', event.target.value)}
            >
              <option value="">Any class</option>
              {classes.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Book
            <select
              className={control + ' max-w-56'}
              value={filters.book ?? ''}
              onChange={(event) => select('book', event.target.value)}
            >
              <option value="">Any book</option>
              {books.map((key) => (
                <option key={key} value={key}>
                  {publicationOf({ ref: 'publication', key }).name}
                </option>
              ))}
            </select>
          </label>
        </form>
      </search>
      <output className="text-muted-foreground text-sm">
        {results.length.toLocaleString()} {results.length === 1 ? 'spell' : 'spells'}
        {pageCount > 1 && ` · Page ${currentPage} of ${pageCount}`}
      </output>
      <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map(({ key, spell }) => (
          <li key={key}>
            <Link
              to="/library/spells/$key"
              params={{ key }}
              search={{ dm }}
              className="border-border bg-card hover:border-primary grid gap-0.5 rounded-lg border p-3"
            >
              <span className="font-semibold">{spell.name}</span>
              <span className="text-muted-foreground text-xs">
                {spellLevelLabel(spell)} · {publicationOf(spell.publication).name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {pageCount > 1 && (
        <nav aria-label="Spell results" className="flex items-center justify-between gap-3">
          {currentPage > 1 ? (
            <button
              type="button"
              className={control}
              onClick={() => onChange(filters, currentPage - 1)}
            >
              <ArrowLeft aria-hidden="true" className="size-4" /> Previous
            </button>
          ) : (
            <span />
          )}
          {currentPage < pageCount && (
            <button
              type="button"
              className={control}
              onClick={() => onChange(filters, currentPage + 1)}
            >
              Next
            </button>
          )}
        </nav>
      )}
      <p className="text-muted-foreground text-xs">
        Spell text is used under each book’s open license; see{' '}
        <Link to="/library/licenses" className="underline">
          licenses and notices
        </Link>
        .
      </p>
    </div>
  )
}
