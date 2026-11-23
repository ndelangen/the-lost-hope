import type { ReactNode } from 'react'

import { ActionButton } from '#/components/dm/encounter/icon-button'
import type { UseCount } from '#/lib/encounter'
import type { Track } from '#/lib/play-sheet'
import { cn } from '#/lib/utils'

/** Spell slots are indigo; a feature's uses take the page's ink, so the two never look alike. */
const PIP = {
  slots: 'border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-400',
  features: 'border-foreground bg-foreground',
  'hit-dice': 'border-emerald-600 bg-emerald-600',
} satisfies Record<Track['group'], string>

const REGAIN = {
  all: 'Back after a Short Rest',
  one: 'Back after a Long Rest, 1 after a Short Rest',
  none: 'Back after a Long Rest',
} satisfies Record<Track['shortRest'], string>

/**
 * One thing the player counts down. Uses are dots: a filled dot is one left, tap it to spend it,
 * tap an empty one to take it back. A pool, such as Lay on Hands, is spent by amount.
 */
export function TrackRow({
  track,
  count,
  icon,
  label,
  onSpend,
}: {
  track: Track
  count: UseCount
  icon?: ReactNode
  /** How the row reads; the track's own name unless the page explains the term. */
  label?: ReactNode
  /** Spend this many; a negative amount gives them back. */
  onSpend: (amount: number) => void
}) {
  const heading = (
    <div className="flex min-w-0 items-center gap-2">
      {icon ? (
        <span aria-hidden className="text-muted-foreground shrink-0 [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      <div className="min-w-0">
        <p className="leading-tight font-semibold">{label ?? track.name}</p>
        <p className="text-muted-foreground text-xs">
          <span className="text-foreground font-medium tabular-nums">
            {count.uses} of {count.maxUses}
          </span>{' '}
          left · {REGAIN[track.shortRest]}
        </p>
      </div>
    </div>
  )
  if (track.pool)
    return (
      <div className="grid gap-2">
        {heading}
        <div className="flex flex-wrap items-center gap-2">
          {[5, 1].map((amount) => (
            <ActionButton
              key={amount}
              className="px-4 whitespace-nowrap"
              disabled={count.uses < amount}
              onClick={() => onSpend(amount)}
            >
              Spend {amount}
            </ActionButton>
          ))}
          <ActionButton
            tone="ghost"
            className="px-3 whitespace-nowrap"
            disabled={count.uses >= count.maxUses}
            onClick={() => onSpend(-1)}
          >
            Put 1 back
          </ActionButton>
        </div>
      </div>
    )
  return (
    <div className="flex items-center justify-between gap-3">
      {heading}
      <div className="flex shrink-0 flex-wrap justify-end gap-1">
        {Array.from({ length: count.maxUses }, (_, index) => {
          const ready = index < count.uses
          return (
            <button
              key={index}
              type="button"
              aria-label={`${track.name}: ${ready ? 'spend one' : 'take one back'}`}
              onClick={() => onSpend(ready ? 1 : -1)}
              // The dot is small; the button around it is a full touch target.
              className="grid size-11 place-items-center rounded-full"
            >
              <span
                className={cn(
                  'size-7 rounded-full border-2 transition-colors',
                  ready ? PIP[track.group] : 'border-border border-dashed bg-transparent',
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
