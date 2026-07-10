import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Badge } from '#/components/ui/badge'
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
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
      <input
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
        placeholder="Search campaign…"
        aria-label="Search campaign"
        className={cn(
          'border-border bg-card ring-ring h-9 w-full rounded-lg border pr-3 pl-9 text-sm outline-none focus:ring-2',
          inputClassName,
        )}
      />
      {open && query.trim().length > 0 ? (
        <div className="border-border bg-card absolute top-full right-0 left-0 z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border shadow-lg">
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
                          className={cn(
                            'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                            isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-muted',
                          )}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => navigateTo(entity)}
                        >
                          <span className="min-w-0 flex-1 truncate">{entity.data.name}</span>
                          <Badge variant="secondary" className="shrink-0">
                            {COLLECTION_LABELS[kind].replace(/s$/, '')}
                          </Badge>
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
