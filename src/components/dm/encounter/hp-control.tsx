import { HeartPlus, Minus, Plus, ShieldPlus, Sword } from 'lucide-react'
import { useId, useState } from 'react'

import type { LiveStats } from '#/lib/encounter'
import { hpFraction, parseAmount } from '#/lib/encounter-focus'
import { cn } from '#/lib/utils'

import { useDensity } from './density'
import { HpBar } from './hp-bar'
import { ActionButton } from './icon-button'

const segment =
  'focus-visible:ring-ring/50 relative flex items-center justify-center outline-none transition-colors focus-visible:z-10 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-35'

/**
 * Hit points as one unit: a joined [ − | current / max | + ] stepper with an HP bar, plus a quick
 * entry to type an amount and apply it as damage or healing. Current and maximum HP are editable.
 * With `onTemp`, the typed amount can also become temporary hit points, shown beside the bar.
 */
export function HpControl({
  name,
  live,
  onAdjust,
  onSet,
  onTemp,
  quickEntry = true,
  size = 'lg',
}: {
  name: string
  live: LiveStats
  onAdjust: (delta: number) => void
  onSet: (field: 'hp' | 'maxHp', value: number) => void
  /** Set temporary hit points to the typed amount; 0 drops them. */
  onTemp?: (value: number) => void
  quickEntry?: boolean
  size?: 'md' | 'lg'
}) {
  const id = useId()
  const [amount, setAmount] = useState('')
  const parsed = parseAmount(amount)
  const fraction = hpFraction(live)
  const density = useDensity()
  // Normal sizing on prep pages; combat focus doubles the targets.
  const scale =
    density === 'normal'
      ? {
          box: 'h-10 rounded-lg border',
          step: 'w-10',
          icon: 'size-5',
          hp: 'w-12 text-xl',
          max: 'w-8 text-sm',
          amount: 'h-9 w-20 rounded-lg border text-sm',
        }
      : size === 'lg'
        ? {
            box: 'h-14 rounded-xl border-2',
            step: 'w-14',
            icon: 'size-7',
            hp: 'w-20 text-3xl',
            max: 'w-12 text-lg',
            amount: 'h-14 w-24 rounded-xl border-2 text-lg',
          }
        : {
            box: 'h-12 rounded-xl border-2',
            step: 'w-12',
            icon: 'size-6',
            hp: 'w-16 text-2xl',
            max: 'w-10 text-base',
            amount: 'h-12 w-20 rounded-xl border-2 text-base',
          }
  const apply = (sign: 1 | -1) => {
    if (parsed === undefined) {
      document.getElementById(id)?.focus()
      return
    }
    onAdjust(sign * parsed)
    setAmount('')
  }

  return (
    <div
      className={cn(
        'flex gap-x-3 gap-y-2',
        density === 'normal' ? 'flex-col items-start' : 'flex-wrap items-start',
      )}
    >
      <div className="grid gap-1.5">
        <fieldset
          aria-label={`Hit points of ${name}`}
          className={cn(
            'border-border bg-card m-0 flex min-w-0 items-stretch overflow-hidden p-0',
            scale.box,
          )}
        >
          <button
            type="button"
            aria-label={`Subtract 1 HP from ${name}`}
            disabled={!live.hp}
            onClick={() => onAdjust(-1)}
            className={cn(segment, 'hover:bg-muted text-red-600 dark:text-red-400', scale.step)}
          >
            <Minus aria-hidden className={cn('stroke-[2.5]', scale.icon)} />
          </button>
          <div
            className={cn(
              'border-border flex items-center gap-0.5 px-2',
              density === 'normal' ? 'border-x' : 'border-x-2',
            )}
          >
            <EditableNumber
              label={`Current HP of ${name}`}
              value={live.hp}
              min={0}
              onCommit={(value) => onSet('hp', value)}
              className={cn('font-bold tabular-nums', scale.hp)}
            />
            <span aria-hidden className="text-muted-foreground">
              /
            </span>
            <EditableNumber
              label={`Maximum HP of ${name}`}
              value={live.maxHp}
              min={1}
              onCommit={(value) => onSet('maxHp', value)}
              className={cn('text-muted-foreground tabular-nums', scale.max)}
            />
          </div>
          <button
            type="button"
            aria-label={`Add 1 HP to ${name}`}
            disabled={live.hp === undefined}
            onClick={() => onAdjust(1)}
            className={cn(
              segment,
              'hover:bg-muted text-emerald-700 dark:text-emerald-400',
              scale.step,
            )}
          >
            <Plus aria-hidden className={cn('stroke-[2.5]', scale.icon)} />
          </button>
        </fieldset>
        {fraction === undefined ? (
          <div className="h-1.5" />
        ) : (
          <HpBar fraction={fraction} className={density === 'normal' ? 'h-1.5' : 'h-2'} />
        )}
        {live.temp && onTemp ? (
          <button
            type="button"
            onClick={() => onTemp(0)}
            aria-label={`Drop the ${live.temp} temporary hit points of ${name}`}
            className="w-fit rounded-md bg-sky-500/15 px-2 py-0.5 text-sm font-semibold text-sky-700 tabular-nums dark:text-sky-300"
          >
            +{live.temp} temporary · drop
          </button>
        ) : null}
      </div>

      {quickEntry ? (
        <form
          className="flex flex-wrap items-center gap-2 self-start"
          onSubmit={(event) => {
            event.preventDefault()
            apply(-1)
          }}
        >
          <label htmlFor={id} className="sr-only">
            Damage or healing amount for {name}
          </label>
          <input
            id={id}
            inputMode="numeric"
            placeholder="Amount"
            value={amount}
            disabled={live.hp === undefined}
            onChange={(event) => setAmount(event.currentTarget.value)}
            className={cn(
              'border-input bg-background focus-visible:border-ring focus-visible:ring-ring/30 px-3 text-center font-semibold tabular-nums outline-none focus-visible:ring-3 disabled:opacity-40',
              scale.amount,
            )}
          />
          <ActionButton type="submit" tone="danger" size={size} disabled={live.hp === undefined}>
            <Sword aria-hidden /> Damage
          </ActionButton>
          <ActionButton
            tone="heal"
            size={size}
            disabled={live.hp === undefined}
            onClick={() => apply(1)}
          >
            <HeartPlus aria-hidden /> Heal
          </ActionButton>
          {onTemp ? (
            <ActionButton
              size={size}
              disabled={live.hp === undefined}
              className="border-sky-500/40 bg-sky-500/10 text-sky-700 hover:bg-sky-500/20 dark:text-sky-300"
              onClick={() => {
                if (parsed === undefined) return document.getElementById(id)?.focus()
                onTemp(parsed)
                setAmount('')
              }}
            >
              <ShieldPlus aria-hidden /> Temp
            </ActionButton>
          ) : null}
        </form>
      ) : null}
    </div>
  )
}

/** A number that reads as plain text until focused; commits valid values as the DM types. */
export function EditableNumber({
  label,
  value,
  min,
  onCommit,
  className,
}: {
  label: string
  value: number | undefined
  min: number
  onCommit: (value: number) => void
  className?: string
}) {
  const [draft, setDraft] = useState<string>()
  return (
    <input
      aria-label={label}
      inputMode="numeric"
      placeholder="—"
      value={draft ?? value ?? ''}
      onChange={(event) => {
        const text = event.currentTarget.value
        setDraft(text)
        const next = Number(text)
        if (/^\d+$/.test(text.trim()) && next >= min) onCommit(next)
      }}
      onFocus={(event) => event.currentTarget.select()}
      onBlur={() => setDraft(undefined)}
      className={cn(
        'hover:bg-muted focus:bg-muted min-w-0 self-center rounded-md bg-transparent px-1 text-center outline-none',
        className,
      )}
    />
  )
}
