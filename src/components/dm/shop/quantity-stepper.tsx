import { Minus, Plus } from 'lucide-react'

import { stepQuantity } from '#/lib/shop'

const stepClass =
  'text-muted-foreground hover:bg-accent hover:text-foreground flex size-8 cursor-pointer items-center justify-center outline-none focus-visible:bg-accent disabled:pointer-events-none disabled:opacity-30'

/**
 * How many of an item are on the shelf: one tap to sell or restock, or type a count. An empty
 * count means the shop has plenty.
 */
export function QuantityStepper({
  name,
  quantity,
  onChange,
}: {
  name: string
  quantity: number | undefined
  onChange: (quantity: number | undefined) => void
}) {
  return (
    <div className="border-input bg-background focus-within:border-ring inline-flex h-8 items-center overflow-hidden rounded-lg border">
      <button
        type="button"
        aria-label={`One fewer ${name}`}
        className={stepClass}
        disabled={quantity === undefined || quantity <= 1}
        onClick={() => onChange(stepQuantity(quantity, -1))}
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <input
        inputMode="numeric"
        aria-label={`How many ${name}; empty for plenty`}
        title="How many are on the shelf. Empty means plenty."
        className="placeholder:text-muted-foreground w-10 [appearance:textfield] bg-transparent text-center text-sm font-medium tabular-nums outline-none"
        placeholder="∞"
        value={quantity ?? ''}
        onChange={(event) => {
          const digits = event.target.value.replace(/\D/g, '')
          onChange(digits ? Number.parseInt(digits, 10) : undefined)
        }}
      />
      <button
        type="button"
        aria-label={`One more ${name}`}
        className={stepClass}
        onClick={() => onChange(stepQuantity(quantity, 1))}
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  )
}
