import { ArrowLeft, ArrowRight, BookOpen, ListOrdered, Minimize2, UserPlus } from 'lucide-react'

import { FOCUS_LAYOUTS, type FocusLayout } from '#/lib/encounter-focus'
import { cn } from '#/lib/utils'

import { ActionButton, IconButton } from './icon-button'

/** The only chrome in combat focus: turn controls, adding enemies, the layout switcher, and the way out. */
export function FocusToolbar({
  name,
  round,
  activeName,
  canStepBack,
  canStep,
  layout,
  onStep,
  onLayout,
  onExit,
  screenOpen,
  onToggleScreen,
  onAddEnemies,
  turnOrderShown,
  onToggleTurnOrder,
}: {
  name: string
  round: number
  activeName: string | undefined
  canStepBack: boolean
  canStep: boolean
  layout: FocusLayout
  onStep: (step: 1 | -1) => void
  onLayout: (layout: FocusLayout) => void
  onExit: () => void
  screenOpen: boolean
  onToggleScreen: () => void
  onAddEnemies: () => void
  /** Whether the player screen shows the turn order. */
  turnOrderShown: boolean
  onToggleTurnOrder: () => void
}) {
  return (
    <div className="border-border bg-card flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border-2 px-4 py-3">
      <div className="min-w-0">
        <p className="text-muted-foreground truncate text-sm">{name}</p>
        <p className="text-xl font-bold tabular-nums" aria-live="polite">
          Round {round}
          {activeName ? (
            <span className="text-muted-foreground font-normal"> · {activeName}</span>
          ) : null}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <ActionButton size="lg" disabled={!canStepBack} onClick={() => onStep(-1)}>
          <ArrowLeft aria-hidden /> Previous
        </ActionButton>
        <ActionButton
          size="lg"
          tone="primary"
          disabled={!canStep}
          onClick={() => onStep(1)}
          className="px-8"
        >
          Next turn <ArrowRight aria-hidden />
        </ActionButton>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <IconButton
          label={
            turnOrderShown
              ? 'Hide the turn order on the player screen'
              : 'Show the turn order on the player screen'
          }
          aria-pressed={turnOrderShown}
          onClick={onToggleTurnOrder}
          className={cn(turnOrderShown && 'border-amber-500 bg-amber-500/15')}
        >
          <ListOrdered aria-hidden />
        </IconButton>
        <ActionButton onClick={onAddEnemies} title="Add to the fight (A)">
          <UserPlus aria-hidden /> Add to fight
        </ActionButton>
        <fieldset className="border-border bg-muted/40 m-0 flex h-12 min-w-0 gap-1 rounded-xl border-2 p-1">
          <legend className="sr-only">Focus layout</legend>
          {(Object.keys(FOCUS_LAYOUTS) as FocusLayout[]).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={layout === option}
              title={FOCUS_LAYOUTS[option].hint}
              onClick={() => onLayout(option)}
              className={cn(
                'rounded-lg px-3 text-sm font-medium',
                layout === option
                  ? 'bg-background font-semibold shadow-sm'
                  : 'hover:bg-background/60',
              )}
            >
              {FOCUS_LAYOUTS[option].label}
            </button>
          ))}
        </fieldset>
        <ActionButton
          aria-expanded={screenOpen}
          onClick={onToggleScreen}
          title="Beginner DM screen (?)"
          className={cn(screenOpen && 'bg-muted')}
        >
          <BookOpen aria-hidden /> DM screen
        </ActionButton>
        <ActionButton onClick={onExit} title="Leave focus (Esc)">
          <Minimize2 aria-hidden /> Exit focus
        </ActionButton>
      </div>
    </div>
  )
}
