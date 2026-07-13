import { useNavigate } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'

import { EntityKindPill } from '#/components/entity-kind-pill'
import { Inline } from '#/components/ui/layout'
import { SearchInput } from '#/components/ui/search-input'
import {
  COLLECTION_LABELS,
  entityLink,
  searchEntities,
  type Entity,
  type EntityKind,
} from '#/lib/campaign'
import { cn } from '#/lib/utils'

type CampaignSearchProps = {
  query: string
  onQueryChange: (value: string) => void
  onNavigate?: () => void
  className?: string
  inputClassName?: string
}

export const CAMPAIGN_SEARCH_PLACEHOLDERS = [
  'Search for events…',
  'Search for PCs…',
  'Search for NPCs…',
  'Search for beasts…',
  'Search for organizations…',
] as const

export function CampaignSearch({
  query,
  onQueryChange,
  onNavigate,
  className,
  inputClassName,
}: CampaignSearchProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  const results = useMemo(() => searchEntities(query, 20), [query])

  const groupedResults = useMemo(() => {
    const grouped = new Map<EntityKind, Entity[]>()
    for (const entity of results) {
      const group = grouped.get(entity.kind) ?? []
      group.push(entity)
      grouped.set(entity.kind, group)
    }
    return grouped
  }, [results])

  const flatResults = useMemo(() => [...groupedResults.values()].flat(), [groupedResults])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % CAMPAIGN_SEARCH_PLACEHOLDERS.length)
    }, 2200)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const navigateTo = (entity: Entity) => {
    navigate(entityLink(entity.kind, entity.slug))
    onQueryChange('')
    setOpen(false)
    onNavigate?.()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      onQueryChange('')
      setOpen(false)
      inputRef.current?.blur()
      return
    }

    if (!open || flatResults.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((index) => (index + 1) % flatResults.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((index) => (index - 1 + flatResults.length) % flatResults.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const selected = flatResults[selectedIndex]
      if (selected) navigateTo(selected)
    }
  }

  let flatIndex = -1

  return (
    <div className={cn('relative', className)}>
      <SearchInput
        ref={inputRef}
        value={query}
        onChange={(e) => {
          onQueryChange(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 150)
        }}
        onKeyDown={handleKeyDown}
        placeholder={CAMPAIGN_SEARCH_PLACEHOLDERS[placeholderIndex]}
        aria-label="Search campaign"
        className={cn('bg-card', inputClassName)}
      />
      {open && query.trim().length > 0 ? (
        <div className="border-border bg-card absolute top-[calc(100%+0.25rem)] right-0 left-0 z-50 max-h-80 overflow-y-auto rounded-lg border shadow-lg">
          {results.length === 0 ? (
            <p className="text-muted-foreground px-3 py-4 text-sm">No results for "{query}"</p>
          ) : (
            groupedResults.size > 0 &&
            [...groupedResults.entries()].map(([kind, items]) => (
              <div key={kind}>
                <p className="text-muted-foreground bg-muted/50 sticky top-0 px-3 py-1.5 text-[11px] font-semibold tracking-wide uppercase">
                  {COLLECTION_LABELS[kind]}
                </p>
                <ul>
                  {items.map((entity) => {
                    flatIndex += 1
                    const index = flatIndex
                    const isSelected = index === selectedIndex
                    return (
                      <li key={`${entity.kind}-${entity.slug}`}>
                        <button
                          type="button"
                          aria-label={`Open ${entity.data.name}`}
                          className={cn(
                            'w-full px-3 py-2 text-left text-sm transition-colors',
                            isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-muted',
                          )}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => navigateTo(entity)}
                        >
                          <Inline as="span" justify="between" gap="sm">
                            <span className="min-w-0 truncate">{entity.data.name}</span>
                            <EntityKindPill kind={kind} className="shrink-0">
                              {COLLECTION_LABELS[kind].replace(/s$/, '')}
                            </EntityKindPill>
                          </Inline>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}
