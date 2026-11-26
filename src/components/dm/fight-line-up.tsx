import { ContentRenderer } from '#/components/content-renderer'
import type { FightGroup, FightLineUp as LineUp } from '#/lib/dm-encounter'
import { cn } from '#/lib/utils'

/** Who is in one fight, on which side, who each group goes for, and how to play them. */
export function FightLineUp({ lineUp, className }: { lineUp: LineUp; className?: string }) {
  const groups = [
    ...lineUp.opponents.map((group) => ({ group, ally: false })),
    ...lineUp.allies.map((group) => ({ group, ally: true })),
  ]
  const planned = groups.some(({ group }) => group.plan)
  return (
    <div className={cn('@container grid gap-2', className)}>
      {planned ? (
        <ul className="grid gap-2">
          {groups.map(({ group, ally }) => (
            <li
              key={groupKey(group)}
              className="grid items-start gap-x-3 gap-y-1 @lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
            >
              <Group group={group} ally={ally} />
              {group.plan ? <ContentRenderer content={group.plan} className="pt-1.5" /> : null}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {groups.map(({ group, ally }) => (
            <li key={groupKey(group)}>
              <Group group={group} ally={ally} />
            </li>
          ))}
        </ul>
      )}
      {lineUp.tactics ? (
        <ContentRenderer content={lineUp.tactics} className="text-muted-foreground" />
      ) : null}
    </div>
  )
}

function groupKey({ creature }: FightGroup) {
  return `${creature.ref}:${creature.key}`
}

function Group({ group, ally }: { group: FightGroup; ally: boolean }) {
  return (
    <div
      className={cn(
        'flex min-h-9 w-fit flex-wrap items-center gap-x-1.5 rounded-lg border px-2.5 py-1 font-medium',
        ally ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-border bg-muted/60',
      )}
    >
      <span className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="font-bold tabular-nums">{group.count} ×</span>
        <ContentRenderer content={[[group.creature]]} />
      </span>
      {ally ? (
        <span className="text-xs font-semibold text-emerald-700 uppercase dark:text-emerald-400">
          with the party
        </span>
      ) : null}
    </div>
  )
}
