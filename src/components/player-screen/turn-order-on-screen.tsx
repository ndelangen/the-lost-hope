import { Skull, UserRound } from 'lucide-react'
import { useMemo } from 'react'

import { useEncounter } from '#/components/dm/encounter/use-encounter-store'
import { Avatar } from '#/components/ui/avatar'
import { resolveScene } from '#/lib/dm-campaign'
import { sceneAllies, turnOrderInputs } from '#/lib/dm-encounter'
import { isRunning } from '#/lib/encounter'
import { playerTurnOrder } from '#/lib/player-turn-order'
import { cn } from '#/lib/utils'

/**
 * The running fight's turn order along the side of the player screen, readable from across the
 * table: the round, whose turn it is, and who comes next.
 */
export function TurnOrderOnScreen() {
  const [encounter] = useEncounter()
  const rows = useMemo(() => {
    if (!encounter || !isRunning(encounter)) return []
    const scene = encounter.scene ? resolveScene(encounter.scene) : undefined
    return playerTurnOrder(
      turnOrderInputs(encounter, scene ? sceneAllies(scene) : undefined),
      encounter.active,
    )
  }, [encounter])
  if (!encounter || rows.length === 0) return null

  return (
    <aside
      aria-label="Turn order"
      className="animate-in fade-in slide-in-from-right-8 absolute inset-y-0 right-0 flex w-[min(32rem,34vw)] flex-col gap-[1vh] bg-gradient-to-l from-black/85 via-black/70 to-transparent py-[3vh] pr-[2vw] pl-[3vw] duration-500"
    >
      <p className="text-[clamp(1rem,2.2vh,1.75rem)] font-semibold tracking-wide text-white/70 uppercase">
        Round {encounter.round}
      </p>
      <ol className="flex min-h-0 flex-col gap-[0.8vh]">
        {rows.map((row) => (
          <li
            key={row.id}
            className={cn(
              'flex min-w-0 items-center gap-[1vw] rounded-2xl px-[0.8vw] py-[0.6vh] transition-all duration-300',
              row.current
                ? 'bg-amber-400 text-black shadow-[0_0_40px_rgb(251_191_36/0.6)]'
                : 'bg-black/65 text-white ring-1 ring-white/15',
            )}
          >
            {row.avatar ? (
              <Avatar
                src={row.avatar}
                sizes="64px"
                maxWidth={128}
                loading="eager"
                className={cn(
                  'size-[clamp(2rem,5vh,4rem)]',
                  row.side === 'enemy' && 'ring-2 ring-red-500',
                )}
              />
            ) : (
              <span
                className={cn(
                  'flex size-[clamp(2rem,5vh,4rem)] shrink-0 items-center justify-center rounded-full',
                  row.side === 'enemy' ? 'bg-red-900/80 text-red-100' : 'bg-white/20',
                )}
              >
                {row.side === 'enemy' ? (
                  <Skull aria-hidden className="size-1/2" />
                ) : (
                  <UserRound aria-hidden className="size-1/2" />
                )}
              </span>
            )}
            <span className="grid min-w-0 grow">
              <span
                className={cn(
                  'line-clamp-2 text-[clamp(1.1rem,2.8vh,2.25rem)] leading-tight',
                  row.current ? 'font-bold' : 'font-medium',
                )}
              >
                {row.letter ? (
                  <span
                    className={cn(
                      'mr-[0.5vw] inline-flex items-center justify-center rounded-md px-[0.4vw] font-bold',
                      row.current ? 'bg-red-800 text-white' : 'bg-red-600 text-white',
                    )}
                  >
                    {row.letter}
                  </span>
                ) : null}
                {row.label}
              </span>
              {row.bloodied ? (
                <span
                  className={cn(
                    'text-[clamp(0.8rem,1.7vh,1.3rem)] font-semibold',
                    row.current ? 'text-red-800' : 'text-red-300',
                  )}
                >
                  Bloodied
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
