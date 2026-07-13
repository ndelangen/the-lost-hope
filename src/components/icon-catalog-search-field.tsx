import { startTransition, useEffect, useState } from 'react'

import { SearchInput } from '#/components/ui/search-input'

export const ICON_SEARCH_COMMIT_DELAY_MS = 150

export function IconCatalogSearchField({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (query: string) => void
}) {
  const [value, setValue] = useState(query)

  useEffect(() => {
    setValue(query)
  }, [query])

  useEffect(() => {
    if (value === query) return

    const timeout = window.setTimeout(() => {
      startTransition(() => onQueryChange(value))
    }, ICON_SEARCH_COMMIT_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [onQueryChange, query, value])

  return (
    <SearchInput
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Fuzzy search by meaning, use, or name…"
      aria-label="Search icon catalog"
      className="h-11"
    />
  )
}
