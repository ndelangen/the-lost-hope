import { ChevronDown, Shield } from 'lucide-react'

import { abilityKey, type UseCount } from '#/lib/encounter'
import { cn } from '#/lib/utils'

import { AbilityButton } from './ability-controls'
import { CombatantPanel, type CombatantActions } from './combatant-panel'
import { ConditionBadges } from './condition-markers'
import type { RosterRow } from './encounter-roster'
import { HpControl } from './hp-control'
import { ScreenLetter } from './screen-letter'

export type CombatantControls = {
  counts: Readonly<Record<string, UseCount | undefined>>
  actions: CombatantActions
}

/**
 * Every combatant as a dense row with inline HP and abilities. The active combatant is
 * highlighted; one row at a time expands to its full stat block.
 */
export function CombatTable({
  rows,
  active,
  expanded,
  openAbility,
  controlsFor,
  onExpand,
}: {
  rows: readonly RosterRow[]
  active: string | undefined
  expanded: string | undefined
  openAbility: string | undefined
  controlsFor: (row: RosterRow) => CombatantControls
  onExpand: (id: string | undefined, ability?: string) => void
}) {
  return (
    <ol className="grid gap-1.5">
      {rows.map((row, index) => {
        const current = row.id === active
        const open = row.id === expanded
        const { counts, actions } = controlsFor(row)
        return (
          <li
            key={row.id}
            aria-current={current ? 'step' : undefined}
            className={cn(
              'border-border bg-card rounded-2xl border-2',
              current &&
                'border-amber-500 bg-amber-500/5 shadow-[0_0_0_3px_rgb(245_158_11_/_0.25)]',
              row.out && 'opacity-60',
            )}
          >
            <div
              className={cn(
                'flex flex-wrap items-start gap-x-5 gap-y-3 px-4',
                row.tracked ? 'py-3' : 'py-2',
              )}
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => onExpand(open ? undefined : row.id)}
                className={cn(
                  'flex min-w-40 grow basis-40 items-center gap-2 text-left',
                  row.tracked ? 'h-12' : 'h-8',
                )}
              >
                <span className="text-muted-foreground w-6 text-right text-sm font-semibold tabular-nums">
                  {index + 1}
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    'text-muted-foreground size-4 shrink-0 transition-transform',
                    open && 'rotate-180',
                  )}
                />
                <ScreenLetter letter={row.letter} />
                <span
                  className={cn(
                    'line-clamp-2 text-lg leading-tight break-words',
                    current ? 'font-bold' : 'font-semibold',
                  )}
                >
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

              {row.tracked ? (
                <div className="flex flex-wrap items-center gap-3">
                  <HpControl
                    name={row.name}
                    live={row.live}
                    onAdjust={actions.adjustHp}
                    onSet={actions.setStat}
                    quickEntry={false}
                    size="md"
                  />
                  <span className="border-border bg-card flex h-12 items-center gap-1.5 self-start rounded-xl border-2 px-3">
                    <Shield aria-hidden className="text-muted-foreground size-5" />
                    <span className="sr-only">Armor class</span>
                    <strong className="text-xl tabular-nums">{row.live.ac ?? '—'}</strong>
                  </span>
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-2 self-start">
                {(row.stats?.abilities ?? []).map((ability) => {
                  const key = abilityKey(ability.timing, ability.name)
                  return (
                    <AbilityButton
                      key={key}
                      ability={ability}
                      context={ability.timing}
                      count={counts[key]}
                      expanded={open && openAbility === key}
                      onToggle={() =>
                        open && openAbility === key ? onExpand(row.id) : onExpand(row.id, key)
                      }
                      block={row.derived!}
                    />
                  )
                })}
              </div>
            </div>
            {open ? (
              <div className="border-border border-t p-2">
                <CombatantPanel
                  combatant={row}
                  isActive={current}
                  live={row.live}
                  counts={counts}
                  openAbility={openAbility}
                  actions={actions}
                />
              </div>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
