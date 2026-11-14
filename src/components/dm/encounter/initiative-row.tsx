import { ArrowLeft, ArrowRight, PawPrint, UserRound } from 'lucide-react'
import { useState } from 'react'

import { Avatar } from '#/components/ui/avatar'
import { HoverPreview } from '#/components/ui/hover-preview'
import type { CombatantView } from '#/lib/dm-encounter'
import { cn } from '#/lib/utils'

import { IconButton } from './icon-button'

/**
 * Turn order as a horizontal row of portraits. Drag a portrait, or press Alt+Arrow on it, to
 * reorder. Clicking inspects a combatant without changing the active turn.
 */
export function InitiativeRow({
  combatants,
  active,
  selected,
  round,
  canStepBack,
  onInspect,
  onMove,
  onStep,
}: {
  combatants: readonly CombatantView[]
  active: string | undefined
  selected: string | undefined
  round: number
  canStepBack: boolean
  onInspect: (id: string) => void
  onMove: (id: string, toIndex: number) => void
  onStep: (step: 1 | -1) => void
}) {
  const [dragging, setDragging] = useState<string>()
  const [dropTarget, setDropTarget] = useState<string>()

  return (
    <section
      aria-labelledby="initiative-heading"
      className="border-border bg-card grid gap-2 rounded-xl border p-3"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 id="initiative-heading" className="font-semibold">
          Initiative
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tabular-nums" aria-live="polite">
            Round {round}
          </span>
          <IconButton
            label="Previous turn"
            size="lg"
            disabled={!canStepBack}
            onClick={() => onStep(-1)}
          >
            <ArrowLeft aria-hidden />
          </IconButton>
          <IconButton
            label="Next turn"
            disabled={combatants.length === 0}
            onClick={() => onStep(1)}
            size="lg"
            tone="primary"
          >
            <ArrowRight aria-hidden />
          </IconButton>
        </div>
      </div>
      <ol className="flex gap-2 overflow-x-auto px-1 pt-2 pb-1" aria-describedby="initiative-hint">
        {combatants.map((combatant, index) => {
          const current = combatant.id === active
          return (
            <li key={combatant.id} className="shrink-0">
              <HoverPreview
                content={`${index + 1}. ${combatant.name}${current ? ' · Current turn' : ''}`}
                className="inline-flex"
              >
                <button
                  type="button"
                  draggable
                  aria-label={combatant.name}
                  aria-current={current ? 'step' : undefined}
                  aria-pressed={combatant.id === selected}
                  onClick={() => onInspect(combatant.id)}
                  onKeyDown={(event) => {
                    const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
                    if (!event.altKey || !direction) return
                    event.preventDefault()
                    onMove(combatant.id, index + direction)
                  }}
                  onDragStart={(event) => {
                    setDragging(combatant.id)
                    event.dataTransfer.setData('text/plain', combatant.id)
                    event.dataTransfer.effectAllowed = 'move'
                  }}
                  onDragOver={(event) => {
                    if (!dragging) return
                    event.preventDefault()
                    setDropTarget(combatant.id)
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
                    'bg-muted text-muted-foreground relative flex size-12 cursor-grab items-center justify-center rounded-full outline-none ring-offset-2 ring-offset-[var(--card)] transition-shadow focus-visible:ring-2 active:cursor-grabbing',
                    current && 'ring-[3px] ring-amber-500',
                    !current && combatant.id === selected && 'ring-ring ring-2',
                    dropTarget === combatant.id && 'outline-primary outline-2 outline-dashed',
                    dragging === combatant.id && 'opacity-50',
                  )}
                >
                  {combatant.avatar ? (
                    <Avatar
                      src={combatant.avatar}
                      sizes="48px"
                      maxWidth={64}
                      className="pointer-events-none size-12"
                    />
                  ) : combatant.kind === 'Beast' ? (
                    <PawPrint aria-hidden className="size-5" />
                  ) : (
                    <UserRound aria-hidden className="size-5" />
                  )}
                  <span
                    aria-hidden
                    className="bg-background text-foreground border-border absolute -right-1 -bottom-1 min-w-5 rounded-full border px-1 text-center text-[10px] leading-4 font-semibold"
                  >
                    {index + 1}
                  </span>
                </button>
              </HoverPreview>
            </li>
          )
        })}
      </ol>
      <p id="initiative-hint" className="sr-only">
        Drag a portrait or press Alt and an arrow key to change the order.
      </p>
    </section>
  )
}
