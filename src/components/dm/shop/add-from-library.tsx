import { Package, PackagePlus, Plus, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { SearchInput } from '#/components/ui/search-input'
import type { StockItem } from '#/definitions/shop'
import { formatPrice, stockLineKey, type StockLineView } from '#/lib/shop'
import { cn } from '#/lib/utils'

import { RarityChip } from './rarity-chip'

/** A search match as the list shows it: the item and what the library says about it. */
export type StockMatch = { item: StockItem; view: StockLineView }

/**
 * A library search that puts goods or a magic item on the shelf. Matches open under the field with
 * their kind, rarity and price; arrow keys and Enter add without leaving the keyboard.
 */
export function AddFromLibrary({
  search,
  onAdd,
  onMakeUp,
}: {
  search: (query: string) => { matches: StockMatch[]; more: number }
  onAdd: (item: StockItem) => void
  /** Starts making up new goods under this name, when the library lacks them. */
  onMakeUp?: (name: string) => void
}) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const { matches, more } = search(query)
  const searching = query.trim().length >= 2
  const current = Math.min(active, matches.length - 1)

  const add = (item: StockItem) => {
    onAdd(item)
    setQuery('')
    setActive(0)
  }

  return (
    <div className="relative">
      <SearchInput
        aria-label="Add goods or a magic item from the library"
        placeholder="Add goods or a magic item…"
        className="h-10"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setActive(0)
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            const step = event.key === 'ArrowDown' ? 1 : -1
            setActive((current + step + matches.length) % Math.max(1, matches.length))
          } else if (event.key === 'Enter' && matches[current]) {
            event.preventDefault()
            add(matches[current].item)
          } else if (event.key === 'Escape') {
            setQuery('')
          }
        }}
      />
      {searching ? (
        <div className="border-border bg-card absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-xl border shadow-lg">
          {matches.length === 0 ? (
            <p className="text-muted-foreground px-3 py-3 text-sm">
              Nothing in the library matches that, or it is already on the shelf.
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto p-1">
              {matches.map(({ item, view }, index) => {
                const Icon = item.ref === 'magicItem' ? Sparkles : Package
                return (
                  <li key={stockLineKey({ item })}>
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-current={index === current}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left',
                        index === current && 'bg-accent',
                      )}
                      onPointerMove={() => setActive(index)}
                      // Keep the field focused, so the next search starts straight away.
                      onPointerDown={(event) => event.preventDefault()}
                      onClick={() => add(item)}
                    >
                      <Icon className="text-muted-foreground size-4 shrink-0" aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{view.name}</span>
                        <span className="text-muted-foreground flex items-center gap-2 text-xs">
                          {view.rarity ? <RarityChip rarity={view.rarity} /> : null}
                          <span className="truncate">
                            {view.category ?? (item.ref === 'magicItem' ? 'Magic item' : 'Goods')}
                          </span>
                        </span>
                      </span>
                      <span className="text-muted-foreground shrink-0 text-sm tabular-nums">
                        {view.price
                          ? `${view.priceNote === 'estimate' ? '≈ ' : ''}${formatPrice(view.price)}`
                          : '—'}
                      </span>
                      <Plus
                        className={cn(
                          'size-4 shrink-0',
                          index === current ? 'text-foreground' : 'text-transparent',
                        )}
                        aria-hidden
                      />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
          {more > 0 ? (
            <p className="text-muted-foreground border-border border-t px-3 py-2 text-xs">
              {more} more. Keep typing to narrow it down.
            </p>
          ) : null}
          {onMakeUp ? (
            <button
              type="button"
              tabIndex={-1}
              className="hover:bg-accent border-border flex w-full cursor-pointer items-center gap-3 border-t px-3.5 py-2.5 text-left text-sm"
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => {
                onMakeUp(query.trim())
                setQuery('')
                setActive(0)
              }}
            >
              <PackagePlus className="text-muted-foreground size-4 shrink-0" aria-hidden />
              <span>
                Make up <span className="font-medium">“{query.trim()}”</span> as new goods…
              </span>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
