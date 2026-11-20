import { Sparkles } from 'lucide-react'

import { ABILITY_ICONS } from '#/lib/ability-icons'
import type { AbilityIndexEntry, AbilityIndexGroup } from '#/lib/ability-index'
import { cn } from '#/lib/utils'

import { ABILITY_KIND } from './ability-kind'

/**
 * Every ability and spell of one creature as named buttons, grouped by when it can use them, to
 * find one at a glance. Without `onSelect` each button is a link that jumps to the ability's card
 * on the same page; with it, the caller decides what choosing one does.
 */
export function AbilityQuickList({
  groups,
  current,
  usesLeft,
  onSelect,
  className,
}: {
  groups: readonly AbilityIndexGroup[]
  /** The key of the ability that is open now, if any. */
  current?: string
  /** Uses left in a running fight, by ability key, in place of the most it can be used. */
  usesLeft?: Readonly<Record<string, number | undefined>>
  onSelect?: (entry: AbilityIndexEntry) => void
  className?: string
}) {
  if (groups.length === 0) return null
  return (
    <nav aria-label="Abilities and spells" className={cn('grid gap-2', className)}>
      {groups.map((group) => (
        <div
          key={group.key}
          className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start sm:gap-3"
        >
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase sm:pt-4">
            {group.label}
          </p>
          <ul className="flex flex-wrap gap-2">
            {group.entries.map((entry) => (
              <li key={entry.key}>
                <QuickEntry
                  entry={entry}
                  current={entry.key === current}
                  left={usesLeft?.[entry.key]}
                  onSelect={onSelect}
                />
              </li>
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
  onSelect,
}: {
  entry: AbilityIndexEntry
  current: boolean
  left?: number
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
      {entry.name}
      {left !== undefined ? (
        <span className="text-muted-foreground text-xs font-normal tabular-nums no-underline">
          {left} left
        </span>
      ) : entry.uses ? (
        <span className="text-muted-foreground text-xs font-normal tabular-nums">
          {entry.uses}×
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
