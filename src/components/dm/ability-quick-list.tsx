import { Sparkles } from 'lucide-react'
import { Fragment, type ReactNode } from 'react'

import { ABILITY_ICONS } from '#/lib/ability-icons'
import type { AbilityIndexEntry, AbilityIndexGroup } from '#/lib/ability-index'
import type { StatPart } from '#/lib/stat-block'
import { cn } from '#/lib/utils'

import { ABILITY_KIND } from './ability-kind'
import { StatParts } from './encounter/stat-parts'

/**
 * Every ability and spell of one creature as named buttons, grouped by when it can use them, to
 * find one at a glance. Without `onSelect` each button is a link that jumps to the ability's card
 * on the same page; with it, the caller decides what choosing one does. `detail` is what the open
 * ability shows: it unfolds directly under that ability's button, so its rules stay beside it.
 */
export function AbilityQuickList({
  groups,
  current,
  usesLeft,
  onSelect,
  detail,
  numbers,
  stacked = false,
  className,
}: {
  groups: readonly AbilityIndexGroup[]
  /** The key of the ability that is open now, if any. */
  current?: string
  /** Uses left in a running fight, by ability key, in place of the most it can be used. */
  usesLeft?: Readonly<Record<string, number | undefined>>
  onSelect?: (entry: AbilityIndexEntry) => void
  /** The open ability's rules and controls, placed right under its button. */
  detail?: ReactNode
  /** The number to roll with, by ability key, shown on the button so it needs no tap. */
  numbers?: Readonly<Record<string, readonly StatPart[] | undefined>>
  /** Group names above their buttons at every width, for a narrow column. */
  stacked?: boolean
  className?: string
}) {
  if (groups.length === 0) return null
  return (
    <nav aria-label="Abilities and spells" className={cn('grid gap-2', className)}>
      {groups.map((group) => (
        <div
          key={group.key}
          className={cn(
            'grid gap-1',
            !stacked && 'sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start sm:gap-3',
          )}
        >
          <p
            className={cn(
              'text-muted-foreground text-xs font-semibold tracking-wide uppercase',
              !stacked && 'sm:pt-4',
            )}
          >
            {group.label}
          </p>
          <ul className="flex flex-wrap gap-2">
            {group.entries.map((entry) => (
              <Fragment key={entry.key}>
                <li>
                  <QuickEntry
                    entry={entry}
                    current={entry.key === current}
                    left={usesLeft?.[entry.key]}
                    number={numbers?.[entry.key]}
                    onSelect={onSelect}
                  />
                </li>
                {detail && entry.key === current ? <li className="basis-full">{detail}</li> : null}
              </Fragment>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function QuickEntry({
  entry,
  current,
  left,
  number,
  onSelect,
}: {
  entry: AbilityIndexEntry
  current: boolean
  left?: number
  number?: readonly StatPart[]
  onSelect?: (entry: AbilityIndexEntry) => void
}) {
  const Icon = ABILITY_ICONS[entry.icon] ?? Sparkles
  const className = cn(
    'border-border bg-card hover:bg-muted focus-visible:ring-ring/50 flex min-h-12 items-center gap-2 rounded-xl border py-1 pr-3 pl-2 text-left text-sm font-semibold outline-none focus-visible:ring-3',
    current && 'ring-ring/60 ring-4',
    left === 0 && 'text-muted-foreground line-through decoration-2',
  )
  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg border [&_svg]:size-5',
          ABILITY_KIND[entry.kind].tone,
        )}
      >
        <Icon />
      </span>
      {number ? (
        <span className="grid">
          {entry.name}
          <span className="text-muted-foreground text-xs font-normal tabular-nums no-underline">
            <StatParts parts={number} interactive={false} />
          </span>
        </span>
      ) : (
        entry.name
      )}
      {left !== undefined || entry.uses ? (
        <span className="text-muted-foreground text-xs font-normal tabular-nums no-underline">
          {left ?? entry.uses} left
        </span>
      ) : null}
    </>
  )
  return onSelect ? (
    <button
      type="button"
      aria-pressed={current}
      className={className}
      onClick={() => onSelect(entry)}
    >
      {content}
    </button>
  ) : (
    <a href={`#${entry.anchor}`} className={className}>
      {content}
    </a>
  )
}
