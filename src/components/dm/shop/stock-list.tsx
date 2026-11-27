import { Lock, LockOpen, X } from 'lucide-react'

import { Button } from '#/components/ui/button'
import type { StockLine } from '#/definitions/shop'
import {
  isSoldOut,
  stockLineKey,
  stockShelves,
  withQuantity,
  withShopPrice,
  type StockLineView,
} from '#/lib/shop'
import { cn } from '#/lib/utils'

import { PriceCell } from './price-cell'
import { QuantityStepper } from './quantity-stepper'
import { RarityChip } from './rarity-chip'

/** How the DM changes the stock; left out where the shop is only read. */
export type StockEditing = {
  locked: ReadonlySet<string>
  onLine: (key: string, line: StockLine | undefined) => void
  onToggleLock: (key: string) => void
}

/** A shop's stock as two shelves, goods and magic items, one line per item. */
export function StockList({
  stock,
  describe,
  ready,
  editing,
}: {
  stock: readonly StockLine[]
  describe: (line: StockLine) => StockLineView
  ready: boolean
  editing?: StockEditing
}) {
  const { goods, magic } = stockShelves(stock)
  const shelves = [
    ['Goods', goods],
    ['Magic items', magic],
  ] as const

  return (
    <div className="@container">
      {shelves.map(([title, lines]) =>
        lines.length === 0 ? null : (
          <section key={title} aria-label={title}>
            <h3 className="bg-muted/40 text-muted-foreground border-border flex items-baseline gap-2 border-y px-5 py-1.5 text-xs font-semibold tracking-wider uppercase">
              {title}
              <span className="font-medium tabular-nums opacity-70">{lines.length}</span>
            </h3>
            <ul className="divide-border divide-y">
              {lines.map((line) => (
                <StockRow
                  key={stockLineKey(line)}
                  line={line}
                  view={describe(line)}
                  ready={ready}
                  editing={editing}
                />
              ))}
            </ul>
          </section>
        ),
      )}
    </div>
  )
}

function StockRow({
  line,
  view,
  ready,
  editing,
}: {
  line: StockLine
  view: StockLineView
  ready: boolean
  editing: StockEditing | undefined
}) {
  const key = stockLineKey(line)
  const locked = editing?.locked.has(key) ?? false
  const soldOut = isSoldOut(line)

  return (
    <li
      className={cn(
        'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-5 py-2.5',
        editing
          ? '@xl:grid-cols-[minmax(0,1fr)_auto_7rem_auto]'
          : 'grid-cols-[minmax(0,1fr)_4.5rem_7rem]',
        soldOut && 'bg-muted/40',
      )}
    >
      <div className={cn('min-w-0', soldOut && 'opacity-60')}>
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className={cn('truncate', soldOut && 'line-through')}>{view.name}</span>
          {soldOut ? (
            <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase no-underline">
              Sold out
            </span>
          ) : null}
        </p>
        <p className="text-muted-foreground flex items-center gap-2 text-xs">
          {view.rarity ? <RarityChip rarity={view.rarity} /> : null}
          {view.category ? <span className="truncate">{view.category}</span> : null}
        </p>
      </div>
      {editing ? (
        <>
          <div className="flex items-center @xl:order-last">
            <Button
              variant="ghost"
              size="icon"
              aria-pressed={locked}
              aria-label={`Keep ${view.name} when re-rolling`}
              title={locked ? 'Kept when you re-roll' : 'Keep this when you re-roll'}
              className={cn(locked && 'text-amber-700 dark:text-amber-300')}
              onClick={() => editing.onToggleLock(key)}
            >
              {locked ? (
                <Lock className="size-4" aria-hidden />
              ) : (
                <LockOpen className="size-4 opacity-60" aria-hidden />
              )}
            </Button>
            <Button
              variant="danger"
              size="icon"
              aria-label={`Remove ${view.name}`}
              title="Take off the shelf"
              onClick={() => editing.onLine(key, undefined)}
            >
              <X className="size-4" aria-hidden />
            </Button>
          </div>
          <div className="justify-self-start">
            <QuantityStepper
              name={view.name}
              quantity={line.quantity}
              onChange={(quantity) => editing.onLine(key, withQuantity(line, quantity))}
            />
          </div>
          <PriceCell
            view={view}
            ready={ready}
            onChange={(price) => editing.onLine(key, withShopPrice(line, price, view.listPrice))}
          />
        </>
      ) : (
        <>
          <p className="text-muted-foreground text-right text-sm tabular-nums">
            {soldOut ? 'Sold out' : line.quantity ? `× ${line.quantity}` : 'Plenty'}
          </p>
          <PriceCell view={view} ready={ready} />
        </>
      )}
    </li>
  )
}
