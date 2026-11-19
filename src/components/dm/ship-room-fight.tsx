import { Check, NotebookText, Swords } from 'lucide-react'

import type { FightGroup } from '#/lib/dm-encounter'
import type { RoomFight } from '#/lib/ship-rooms'
import { cn } from '#/lib/utils'

function groupLabel({ count, name }: FightGroup) {
  return `${count} × ${name}`
}

/**
 * One fight in a room of the ship: who is in it, and the button that runs it in the scene's
 * encounter. In a sector tile it stacks; as a bar it lies in one row under the deck.
 */
export function ShipRoomFight({
  fight,
  layout,
  onRun,
  onNotes,
}: {
  fight: RoomFight
  layout: 'tile' | 'bar'
  onRun: () => void
  /** Open the notes of the fight's beat, where the page has them. */
  onNotes?: () => void
}) {
  const done = fight.joined > 0 && !fight.repeats
  return (
    <div
      className={cn(
        'grid gap-2',
        layout === 'bar' &&
          'border-border bg-card items-center rounded-xl border-2 p-3 sm:grid-cols-[minmax(0,1fr)_auto]',
      )}
    >
      <div className="grid min-w-0 gap-1">
        <p className="leading-tight font-semibold">{fight.key}</p>
        <ul className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm">
          {fight.opponents.map((group) => (
            <li key={group.creature.key}>{groupLabel(group)}</li>
          ))}
          {fight.allies.map((group) => (
            <li
              key={group.creature.key}
              className="font-semibold text-emerald-700 dark:text-emerald-400"
            >
              {groupLabel(group)}, with the party
            </li>
          ))}
        </ul>
        {fight.joined > 0 && fight.repeats ? (
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            {fight.joined === 1 ? '1 group' : `${fight.joined} groups`} in the fight so far
          </p>
        ) : null}
      </div>
      <div className={cn('flex gap-2', layout === 'tile' && 'flex-col')}>
        {done ? (
          <p className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-3 font-semibold text-emerald-700 dark:text-emerald-400">
            <Check aria-hidden className="size-5 shrink-0" /> In the fight
          </p>
        ) : (
          <button
            type="button"
            onClick={onRun}
            className={cn(
              'focus-visible:ring-ring/50 flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border-2 px-3 py-1.5 text-left leading-tight font-semibold outline-none focus-visible:ring-3',
              fight.joined > 0
                ? 'border-border bg-card hover:bg-muted'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent',
            )}
          >
            {layout === 'bar' ? <Swords aria-hidden className="size-5 shrink-0" /> : null}
            {fight.joined > 0 ? 'Bring in another group' : 'Run the encounter here'}
          </button>
        )}
        {onNotes ? (
          <button
            type="button"
            onClick={onNotes}
            aria-label={`Notes for ${fight.key}`}
            className="border-border bg-card hover:bg-muted focus-visible:ring-ring/50 flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 px-3 font-semibold outline-none focus-visible:ring-3"
          >
            <NotebookText aria-hidden className="size-5 shrink-0" /> Notes
          </button>
        ) : null}
      </div>
    </div>
  )
}
