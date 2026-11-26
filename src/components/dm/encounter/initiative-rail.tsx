import { PawPrint, Shield, UserRound } from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '#/components/ui/avatar'
import type { CombatantView } from '#/lib/dm-encounter'
import type { LiveStats } from '#/lib/encounter'
import { hpFraction } from '#/lib/encounter-focus'
import { cn } from '#/lib/utils'

import type { CombatState } from './combat-status'
import { ConditionBadges } from './condition-markers'
import { HpBar } from './hp-bar'
import { ScreenLetter } from './screen-letter'

/** One combatant as the encounter shows it: who it is, its live values, and how it is doing. */
export type RosterRow = CombatantView & {
  live: LiveStats
  combat: CombatState
  /** Down or dead: skipped in turn order. */
  out: boolean
  /** The letter an unnamed enemy carries on the player screen. */
  letter?: string
}

/**
 * Turn order as a vertical rail with HP and AC. Clicking inspects without changing the turn;
 * dragging a row, or Alt and an arrow key, moves it in the order.
 */
export function InitiativeRail({
  rows,
  active,
  selected,
  onInspect,
  onMove,
}: {
  rows: readonly RosterRow[]
  active: string | undefined
  selected: string | undefined
  onInspect: (id: string) => void
  onMove: (id: string, toIndex: number) => void
}) {
  const [dragging, setDragging] = useState<string>()
  const [dropTarget, setDropTarget] = useState<string>()
  return (
    <nav
      aria-label="Initiative"
      className="border-border bg-card grid min-w-0 gap-1 rounded-2xl border-2 p-2"
    >
      <ol className="grid gap-1" aria-describedby="initiative-hint">
        {rows.map((row, index) => {
          const fraction = row.tracked ? hpFraction(row.live) : undefined
          const current = row.id === active
          return (
            <li key={row.id}>
              <button
                type="button"
                draggable
                aria-current={current ? 'step' : undefined}
                aria-pressed={row.id === selected}
                onClick={() => onInspect(row.id)}
                onKeyDown={(event) => {
                  const direction = { ArrowUp: -1, ArrowDown: 1 }[event.key]
                  if (!event.altKey || !direction) return
                  event.preventDefault()
                  onMove(row.id, index + direction)
                }}
                onDragStart={(event) => {
                  setDragging(row.id)
                  event.dataTransfer.setData('text/plain', row.id)
                  event.dataTransfer.effectAllowed = 'move'
                }}
                onDragOver={(event) => {
                  if (!dragging) return
                  event.preventDefault()
                  setDropTarget(row.id)
                }}
                onDragLeave={() => setDropTarget(undefined)}
                onDrop={(event) => {
                  event.preventDefault()
                  if (dragging) onMove(dragging, index)
                  setDragging(undefined)
                  setDropTarget(undefined)
                }}
                onDragEnd={() => {
                  setDragging(undefined)
                  setDropTarget(undefined)
                }}
                className={cn(
                  'flex w-full min-w-0 cursor-grab items-center gap-3 rounded-xl px-2.5 py-1.5 text-left active:cursor-grabbing',
                  current ? 'bg-amber-500/15 ring-2 ring-amber-500' : 'hover:bg-muted',
                  !current && row.id === selected && 'bg-muted',
                  row.out && 'opacity-55',
                  dropTarget === row.id && 'outline-primary outline-2 outline-dashed',
                  dragging === row.id && 'opacity-50',
                )}
              >
                {row.avatar ? (
                  <Avatar src={row.avatar} sizes="36px" maxWidth={64} className="size-9" />
                ) : (
                  <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
                    {row.kind === 'Beast' ? (
                      <PawPrint aria-hidden className="size-4" />
                    ) : (
                      <UserRound aria-hidden className="size-4" />
                    )}
                  </span>
                )}
                <span className="grid min-w-0 grow gap-1">
                  <span className="flex min-w-0 items-center justify-between gap-2">
                    <span className="flex min-w-0 items-baseline gap-1.5">
                      <ScreenLetter letter={row.letter} />
                      <span
                        className={cn(
                          'truncate text-base leading-tight',
                          current ? 'font-bold' : 'font-medium',
                        )}
                      >
                        <span className="sr-only">
                          {index + 1} of {rows.length}:{' '}
                        </span>
                        {row.name}
                      </span>
                    </span>
                    {/* The badges give way to the name first: one row, at least two badges wide, scrolling sideways. */}
                    <span className="flex min-w-14 shrink-[20] overflow-x-auto [scrollbar-width:thin] empty:hidden">
                      <ConditionBadges
                        conditions={row.combat.conditions}
                        appliedEffects={row.combat.appliedEffects}
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
                    </span>
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2 text-sm tabular-nums">
                    <span className="grow">
                      {fraction === undefined ? null : <HpBar fraction={fraction} />}
                    </span>
                    {row.tracked && row.live.hp !== undefined ? (
                      <span>
                        {row.live.hp}/{row.live.maxHp}
                      </span>
                    ) : null}
                    {row.live.ac !== undefined ? (
                      <span className="flex items-center gap-0.5" title="Armor class">
                        <Shield aria-label="AC" className="size-3.5" />
                        {row.live.ac}
                      </span>
                    ) : null}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <p id="initiative-hint" className="text-muted-foreground px-2 pt-1 text-xs">
        Drag to change the order, or Alt and an arrow key.
      </p>
    </nav>
  )
}
