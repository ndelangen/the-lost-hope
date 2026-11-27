import { Check, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Select } from '#/components/ui/select'
import { COINS, type Coin, type Price } from '#/definitions/price'
import { formatPrice, type StockLineView } from '#/lib/shop'
import { cn } from '#/lib/utils'

/**
 * What a stock line costs, with why when that is not the item's own price. When the shop can be
 * edited, the price opens a small form to set what this shop asks or go back to the list price.
 */
export function PriceCell({
  view,
  ready,
  onChange,
}: {
  view: StockLineView
  /** Whether the library has loaded, so a missing price is really missing. */
  ready: boolean
  onChange?: (price: Price | undefined) => void
}) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  const overridden = view.priceNote === 'set by the shop'
  const shown = (
    <span className="grid justify-items-end leading-tight">
      <span
        className={cn(
          'text-sm font-semibold tabular-nums',
          overridden && 'text-amber-700 dark:text-amber-300',
          !view.price && ready && 'text-red-600 dark:text-red-400',
        )}
      >
        {view.price
          ? `${view.priceNote === 'estimate' ? '≈ ' : ''}${formatPrice(view.price)}`
          : ready
            ? 'No price'
            : '…'}
      </span>
      {overridden && view.listPrice ? (
        <span className="text-muted-foreground text-[11px] tabular-nums line-through">
          {formatPrice(view.listPrice)}
        </span>
      ) : overridden ? (
        <span className="text-muted-foreground text-[11px]">shop’s price</span>
      ) : view.priceNote === 'estimate' ? (
        <span className="text-muted-foreground text-[11px]">estimate</span>
      ) : null}
    </span>
  )
  if (!onChange) return shown

  return (
    <div ref={box} className="relative justify-self-end">
      <button
        type="button"
        aria-label={`Price of ${view.name}`}
        aria-expanded={open}
        title="Set what this shop asks"
        className="hover:bg-accent focus-visible:ring-ring/40 -mr-2 cursor-pointer rounded-lg px-2 py-1 outline-none focus-visible:ring-2"
        onClick={() => setOpen((current) => !current)}
      >
        {shown}
      </button>
      {open ? (
        <PriceForm
          view={view}
          onCancel={() => setOpen(false)}
          onSubmit={(price) => {
            onChange(price)
            setOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

function PriceForm({
  view,
  onSubmit,
  onCancel,
}: {
  view: StockLineView
  onSubmit: (price: Price | undefined) => void
  onCancel: () => void
}) {
  const [amount, setAmount] = useState(String(view.price?.amount ?? ''))
  const [coin, setCoin] = useState<Coin>(view.price?.coin ?? 'gp')
  const value = Number.parseFloat(amount)
  const field = useRef<HTMLInputElement>(null)

  useEffect(() => {
    field.current?.select()
  }, [])

  return (
    <form
      className="border-border bg-card absolute top-full right-0 z-30 mt-1 grid w-60 gap-3 rounded-xl border p-3 text-left shadow-lg"
      onSubmit={(event) => {
        event.preventDefault()
        if (value > 0) onSubmit({ amount: value, coin })
      }}
    >
      <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        This shop asks
      </p>
      <div className="flex gap-2">
        <Input
          ref={field}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onCancel()
          }}
          inputMode="decimal"
          aria-label="Amount"
          className="h-10 tabular-nums"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
        <Select
          aria-label="Coin"
          containerClassName="w-20 shrink-0"
          value={coin}
          onChange={(event) => setCoin(event.target.value as Coin)}
        >
          {COINS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Button type="submit" variant="primary" className="w-10 px-0" disabled={!(value > 0)}>
          <Check className="size-4" aria-hidden />
          <span className="sr-only">Set price</span>
        </Button>
      </div>
      {view.priceNote === 'set by the shop' && view.listPrice ? (
        <Button
          variant="ghost"
          size="sm"
          className="-mx-1 justify-start"
          onClick={() => onSubmit(undefined)}
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Back to the list price, {formatPrice(view.listPrice)}
        </Button>
      ) : view.listPrice ? (
        <p className="text-muted-foreground text-xs">
          List price {view.priceNote === 'estimate' ? '(our estimate) ' : ''}
          {formatPrice(view.listPrice)}
        </p>
      ) : (
        <p className="text-muted-foreground text-xs">The library has no price for this.</p>
      )}
    </form>
  )
}
