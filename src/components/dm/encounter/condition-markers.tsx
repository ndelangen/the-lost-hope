import { Brain, X } from 'lucide-react'

import { HoverPreview } from '#/components/ui/hover-preview'
import { CONDITIONS } from '#/definitions/rules-glossary'
import { CONDITION_ICONS } from '#/lib/condition-icons'
import { describeDuration, type ActiveCondition } from '#/lib/encounter-combat'
import { cn } from '#/lib/utils'

import { useDensity } from './density'

/**
 * A combatant's conditions as small icon + name markers, with the rule and its duration on hover,
 * tap, or keyboard focus. Concentration shows alongside.
 */
export function ConditionMarkers({
  conditions,
  concentration,
  nameOf,
  onRemove,
  compact = false,
}: {
  conditions: readonly ActiveCondition[]
  concentration?: { on: string }
  nameOf: (id: string) => string
  onRemove?: (conditionId: string) => void
  /** Icons only, for tight rows. */
  compact?: boolean
}) {
  const focus = useDensity() === 'focus'
  if (conditions.length === 0 && !concentration) return null
  const marker = cn(
    'inline-flex items-center gap-1 rounded-md border font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
    focus ? 'h-8 px-2 text-sm [&_svg]:size-4' : 'h-6 px-1.5 text-xs [&_svg]:size-3.5',
    compact && 'px-1',
  )

  return (
    <span className="flex flex-wrap items-center gap-1">
      {concentration ? (
        <HoverPreview
          content={
            <>
              <strong>Concentrating{concentration.on ? ` on ${concentration.on}` : ''}</strong>
              <span>
                Damage calls for a Constitution save, DC 10 or half the damage. Incapacitated ends
                it.
              </span>
            </>
          }
        >
          <button
            type="button"
            className={cn(
              marker,
              'border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300',
            )}
          >
            <Brain aria-hidden />
            {compact ? <span className="sr-only">Concentrating</span> : 'Concentrating'}
          </button>
        </HoverPreview>
      ) : null}
      {conditions.map((held) => {
        const Icon = CONDITION_ICONS[held.condition]
        return (
          <span key={held.id} className="inline-flex items-center">
            <HoverPreview
              content={
                <>
                  <strong className="capitalize">{held.condition}</strong>
                  <span>{CONDITIONS[held.condition]}</span>
                  <span className="text-muted-foreground">
                    {describeDuration(held.duration, nameOf)}
                  </span>
                </>
              }
            >
              <button
                type="button"
                className={cn(
                  marker,
                  'border-amber-500/40 bg-amber-500/10 text-amber-800 capitalize dark:text-amber-300',
                  onRemove && 'rounded-r-none',
                )}
              >
                <Icon aria-hidden />
                {compact ? <span className="sr-only">{held.condition}</span> : held.condition}
              </button>
            </HoverPreview>
            {onRemove ? (
              <button
                type="button"
                aria-label={`Remove ${held.condition}`}
                onClick={() => onRemove(held.id)}
                className={cn(
                  marker,
                  'rounded-l-none border-l-0 border-amber-500/40 bg-amber-500/10 text-amber-800 hover:bg-amber-500/25 dark:text-amber-300',
                )}
              >
                <X aria-hidden />
              </button>
            ) : null}
          </span>
        )
      })}
    </span>
  )
}

/** Compact, non-interactive condition icons for places that are already a button, like rows. */
export function ConditionBadges({
  conditions,
  concentration,
  out,
}: {
  conditions: readonly ActiveCondition[]
  concentration?: { on: string }
  /** Down or dead. */
  out?: 'down' | 'dead' | 'dying' | 'stable'
}) {
  const focus = useDensity() === 'focus'
  if (conditions.length === 0 && !concentration && !out) return null
  const badge = cn(
    'inline-flex items-center justify-center rounded-md',
    focus ? 'size-7 [&_svg]:size-4' : 'size-5 [&_svg]:size-3.5',
  )
  return (
    <span className="flex flex-wrap items-center gap-1">
      {out ? (
        <span
          className={cn(
            'rounded-md px-1.5 text-xs font-semibold uppercase',
            out === 'dying'
              ? 'bg-red-500/15 text-red-700 dark:text-red-400'
              : out === 'stable'
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                : 'bg-muted text-muted-foreground',
          )}
        >
          {out}
        </span>
      ) : null}
      {concentration ? (
        <span
          title={`Concentrating${concentration.on ? ` on ${concentration.on}` : ''}`}
          className={cn(badge, 'bg-violet-500/15 text-violet-700 dark:text-violet-300')}
        >
          <Brain aria-hidden />
          <span className="sr-only">Concentrating</span>
        </span>
      ) : null}
      {conditions.map((held) => {
        const Icon = CONDITION_ICONS[held.condition]
        return (
          <span
            key={held.id}
            title={held.condition}
            className={cn(badge, 'bg-amber-500/15 text-amber-800 dark:text-amber-300')}
          >
            <Icon aria-hidden />
            <span className="sr-only">{held.condition}</span>
          </span>
        )
      })}
    </span>
  )
}
