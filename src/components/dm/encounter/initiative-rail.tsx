import { PawPrint, UserRound } from 'lucide-react'

import { Avatar } from '#/components/ui/avatar'
import { hpFraction } from '#/lib/encounter-focus'
import { cn } from '#/lib/utils'

import { ConditionBadges } from './condition-markers'
import type { RosterRow } from './encounter-roster'
import { HpBar } from './hp-bar'
import { ScreenLetter } from './screen-letter'

/** Turn order as a slim vertical rail with HP bars. Clicking inspects without changing the turn. */
export function InitiativeRail({
  rows,
  active,
  selected,
  onInspect,
}: {
  rows: readonly RosterRow[]
  active: string | undefined
  selected: string | undefined
  onInspect: (id: string) => void
}) {
  return (
    <nav aria-label="Initiative" className="border-border bg-card min-w-0 rounded-2xl border-2 p-2">
      <ol className="grid gap-1">
        {rows.map((row, index) => {
          const fraction = row.tracked ? hpFraction(row.live) : undefined
          const current = row.id === active
          return (
            <li key={row.id}>
              <button
                type="button"
                aria-current={current ? 'step' : undefined}
                aria-pressed={row.id === selected}
                onClick={() => onInspect(row.id)}
                className={cn(
                  'flex w-full min-w-0 items-center gap-3 rounded-xl px-2.5 py-2 text-left',
                  current ? 'bg-amber-500/15 ring-2 ring-amber-500' : 'hover:bg-muted',
                  !current && row.id === selected && 'bg-muted',
                  row.out && 'opacity-55',
                )}
              >
                <span className="text-muted-foreground w-5 text-right text-sm font-semibold tabular-nums">
                  {index + 1}
                </span>
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
                  <span className="flex min-w-0 items-baseline justify-between gap-2">
                    <span className="flex min-w-0 items-baseline gap-1.5">
                      <ScreenLetter letter={row.letter} />
                      <span
                        className={cn(
                          'line-clamp-2 text-base leading-tight break-words',
                          current ? 'font-bold' : 'font-medium',
                        )}
                      >
                        {row.name}
                      </span>
                    </span>
                    {row.tracked && row.live.hp !== undefined ? (
                      <span className="text-muted-foreground shrink-0 text-sm tabular-nums">
                        {row.live.hp}/{row.live.maxHp}
                      </span>
                    ) : null}
                  </span>
                  {fraction === undefined ? null : <HpBar fraction={fraction} />}
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
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
