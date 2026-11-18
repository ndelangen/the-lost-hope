import { ContentRenderer } from '#/components/content-renderer'
import type { FightGroup, FightLineUp as LineUp } from '#/lib/dm-encounter'
import { cn } from '#/lib/utils'

/** Who is in one fight, on which side, and how to play them. */
export function FightLineUp({ lineUp, className }: { lineUp: LineUp; className?: string }) {
  return (
    <div className={cn('grid gap-2', className)}>
      <ul className="flex flex-wrap gap-2">
        {lineUp.opponents.map((group) => (
          <Group key={groupKey(group)} group={group} />
        ))}
        {lineUp.allies.map((group) => (
          <Group key={groupKey(group)} group={group} ally />
        ))}
      </ul>
      {lineUp.tactics ? (
        <ContentRenderer content={lineUp.tactics} className="text-muted-foreground" />
      ) : null}
    </div>
  )
}

function groupKey({ creature }: FightGroup) {
  return `${creature.ref}:${creature.key}`
}

function Group({ group, ally = false }: { group: FightGroup; ally?: boolean }) {
  return (
    <li
      className={cn(
        'flex min-h-9 flex-wrap items-center gap-x-1.5 rounded-lg border px-2.5 py-1 font-medium',
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
    </li>
  )
}
