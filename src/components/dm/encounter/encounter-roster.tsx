import { X } from 'lucide-react'

import type { CombatantView } from '#/lib/dm-encounter'
import type { LiveStats } from '#/lib/encounter'
import { cn } from '#/lib/utils'

import type { CombatState } from './combat-status'
import { ConditionBadges } from './condition-markers'
import { IconButton } from './icon-button'

export type RosterRow = CombatantView & {
  live: LiveStats
  combat: CombatState
  /** Down or dead: skipped in turn order. */
  out: boolean
}

/** A compact table of every combatant with current HP and AC, sized for ten or more entries. */
export function EncounterRoster({
  rows,
  active,
  selected,
  onInspect,
  onRemove,
}: {
  rows: readonly RosterRow[]
  active: string | undefined
  selected: string | undefined
  onInspect: (id: string) => void
  onRemove: (id: string) => void
}) {
  return (
    <section
      aria-labelledby="roster-heading"
      className="border-border bg-card grid content-start gap-2 rounded-xl border p-3"
    >
      <h2 id="roster-heading" className="font-semibold">
        Roster <span className="text-muted-foreground text-sm font-normal">{rows.length}</span>
      </h2>
      {rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">Add NPCs, beasts, and players below.</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-muted-foreground text-left text-xs">
            <tr>
              <th scope="col" className="py-1 font-medium">
                Combatant
              </th>
              <th scope="col" className="py-1 text-right font-medium">
                HP
              </th>
              <th scope="col" className="py-1 text-right font-medium">
                AC
              </th>
              <th scope="col" className="sr-only">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={cn(
                  'border-border border-t',
                  row.id === active && 'bg-amber-500/10',
                  row.id === selected && 'bg-muted',
                  row.out && 'opacity-60',
                )}
              >
                <td className="py-1">
                  <button
                    type="button"
                    aria-pressed={row.id === selected}
                    onClick={() => onInspect(row.id)}
                    className="flex w-full items-baseline gap-2 rounded text-left hover:underline"
                  >
                    <span className={cn('font-medium', row.id === active && 'font-semibold')}>
                      {row.name}
                    </span>
                    {row.tracked ? null : (
                      <span className="text-muted-foreground text-xs">{row.kind}</span>
                    )}
                    <ConditionBadges
                      conditions={row.combat.conditions}
                      concentration={row.combat.concentration}
                      effects={row.effects}
                      out={
                        row.combat.dead
                          ? 'dead'
                          : row.combat.dying
                            ? 'dying'
                            : row.combat.stable
                              ? 'stable'
                              : row.combat.down
                                ? 'down'
                                : undefined
                      }
                    />
                  </button>
                </td>
                <td
                  className={cn(
                    'py-1 text-right tabular-nums',
                    row.live.hp === 0 && 'text-red-600 dark:text-red-400',
                  )}
                >
                  {row.tracked && row.live.hp !== undefined ? (
                    <>
                      <strong>{row.live.hp}</strong>
                      <span className="text-muted-foreground">/{row.live.maxHp}</span>
                    </>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="py-1 text-right tabular-nums">
                  {row.tracked ? (row.live.ac ?? '—') : '—'}
                </td>
                <td className="py-1 pl-2 text-right">
                  <IconButton
                    label={`Remove ${row.name}`}
                    onClick={() => onRemove(row.id)}
                    size="sm"
                    tone="ghost"
                    className="hover:text-red-600"
                  >
                    <X aria-hidden />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
