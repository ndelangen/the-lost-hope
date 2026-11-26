import { createFileRoute, stripSearchParams } from '@tanstack/react-router'

import { SpellBrowse } from '#/components/library/spell-browse'

type SpellSearch = {
  dm?: true
  q?: string
  level?: number
  school?: string
  spellClass?: string
  book?: string
  page?: number
}

const text = (value: unknown) =>
  typeof value === 'string' && value.trim() ? value.trim().slice(0, 120) : undefined

function spellSearch(input: Record<string, unknown>): SpellSearch {
  const level = Number(input.level)
  const page = Number(input.page)
  return {
    dm: input.dm === '' || input.dm === true ? true : undefined,
    q: text(input.q),
    level:
      Number.isInteger(level) &&
      level >= 0 &&
      level <= 9 &&
      input.level !== '' &&
      input.level !== undefined
        ? level
        : undefined,
    school: text(input.school),
    spellClass: text(input.spellClass),
    book: text(input.book),
    page: Number.isSafeInteger(page) && page > 1 ? page : undefined,
  }
}

export const Route = createFileRoute('/library/spells/')({
  validateSearch: spellSearch,
  search: { middlewares: [stripSearchParams(spellSearch({}))] },
  head: () => ({ meta: [{ title: 'Spells | The Lost Hope Library' }] }),
  component: SpellsPage,
})

function SpellsPage() {
  const { dm, page, ...filters } = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <SpellBrowse
      filters={filters}
      page={page}
      dm={dm}
      onChange={(next, nextPage) => void navigate({ search: { dm, ...next, page: nextPage } })}
    />
  )
}
