import { Moon, RotateCcw, Sunrise, X } from 'lucide-react'

import { EffectText, EffectTokens } from '#/components/effect-text'
import { EntityReference } from '#/components/entity-reference'
import { EFFECT_TRIGGERS, type EffectTrigger } from '#/definitions/effect'
import { EffectIcon } from '#/lib/effect-icons'
import type {
  EffectLiveState,
  LiveEffect,
  ObligationStatus,
  Reminder,
} from '#/lib/effect-reminders'
import { cn } from '#/lib/utils'

type EffectPanelActions = {
  fire: (trigger: EffectTrigger) => void
  dismiss: (id: string) => void
  close: () => void
  meet: (id: string) => void
  end: (slug: string) => void
  restore: (slug: string) => void
  reset: () => void
}

const buttonClass =
  'border-border hover:bg-muted inline-flex min-h-12 items-center gap-2 rounded-lg border px-4 text-base font-semibold'

/** Live effect reminders and obligation clocks for the DM during play. */
export function DmEffectsPanel({
  state,
  effects,
  endedEffects,
  reminders,
  obligations,
  actions,
}: {
  state: EffectLiveState
  effects: readonly LiveEffect[]
  endedEffects: readonly LiveEffect[]
  reminders: readonly Reminder[]
  obligations: readonly ObligationStatus[]
  actions: EffectPanelActions
}) {
  return (
    <section
      aria-labelledby="effects-in-play"
      className="border-border grid gap-4 rounded-xl border p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="effects-in-play" className="text-xl font-bold">
            Effects in play
          </h2>
          <p className="text-muted-foreground text-sm">
            Live day {state.day}. Kept in this browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={buttonClass} onClick={() => actions.fire('newDay')}>
            <Sunrise className="size-6" aria-hidden /> New day
          </button>
          <button type="button" className={buttonClass} onClick={() => actions.fire('longRest')}>
            <Moon className="size-6" aria-hidden /> Long rest
          </button>
          <button
            type="button"
            className={cn(buttonClass, 'px-3')}
            onClick={actions.reset}
            aria-label="Reset live effect state"
            title="Reset live effect state"
          >
            <RotateCcw className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      {state.fired ? (
        <output className="grid gap-2 rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950/30">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">
              {EFFECT_TRIGGERS[state.fired.trigger]} · day {state.fired.day}
            </p>
            <button
              type="button"
              className="hover:bg-muted inline-flex size-12 items-center justify-center rounded-lg"
              onClick={actions.close}
              aria-label="Close reminders"
              title="Close reminders"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
          {reminders.length === 0 ? (
            <p className="text-muted-foreground text-sm">No effect asks for a reminder now.</p>
          ) : (
            <ul className="grid gap-2">
              {reminders.map((reminder) => (
                <li key={reminder.id} className="bg-card flex items-start gap-3 rounded-lg p-3">
                  <EffectIcon
                    icon={reminder.effect.data.icon}
                    className="mt-0.5 size-6 text-indigo-600 dark:text-indigo-300"
                  />
                  <div className="grid min-w-0 flex-1 gap-1">
                    <EntityReference
                      kind="effect"
                      slug={reminder.effect.slug}
                      label={reminder.effect.name}
                    />
                    <EffectText text={reminder.text} />
                  </div>
                  <button
                    type="button"
                    className={cn(buttonClass, 'text-sm')}
                    onClick={() => actions.dismiss(reminder.id)}
                  >
                    Dismiss
                  </button>
                </li>
              ))}
            </ul>
          )}
        </output>
      ) : null}

      {effects.length > 0 ? (
        <ul className="divide-border divide-y" aria-label="Effects in force">
          {effects.map((effect) => (
            <li key={effect.slug} className="flex flex-wrap items-center gap-3 py-2">
              <div className="grid min-w-0 flex-1 gap-0.5">
                <p className="text-sm">
                  <EntityReference kind="effect" slug={effect.slug} label={effect.name} />
                  <span className="text-muted-foreground"> · on {effect.carrier}</span>
                </p>
                <p className="text-muted-foreground text-sm">{lastsLabel(effect, state.day)}</p>
              </div>
              <button
                type="button"
                className={cn(buttonClass, 'text-sm')}
                onClick={() => actions.end(effect.slug)}
              >
                End
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm">
          No lasting effects in force on day {state.day}.
        </p>
      )}

      {endedEffects.length > 0 ? (
        <div className="grid gap-2 rounded-lg bg-amber-50 p-3 dark:bg-amber-950/30">
          <p className="text-sm">
            <span className="font-semibold">Ended at the table.</span> Record these in the session
            import, or they come back after a reset.
          </p>
          <ul className="grid gap-2">
            {endedEffects.map((effect) => (
              <li key={effect.slug} className="flex flex-wrap items-center gap-3">
                <EffectIcon icon={effect.data.icon} className="text-muted-foreground size-6" />
                <p className="min-w-0 flex-1 text-sm">
                  <span className="font-semibold">{effect.name}</span>
                  <span className="text-muted-foreground">
                    {' '}
                    · on {effect.carrier} · ended day {state.ended[effect.slug]}
                  </span>
                </p>
                <button
                  type="button"
                  className={cn(buttonClass, 'text-sm')}
                  onClick={() => actions.restore(effect.slug)}
                >
                  Undo
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {obligations.length > 0 ? (
        <ul className="divide-border divide-y" aria-label="Obligations">
          {obligations.map((obligation) => (
            <li key={obligation.id} className="flex flex-wrap items-center gap-3 py-2">
              <EffectIcon
                icon={obligation.effect.data.icon}
                className="size-6 text-indigo-600 dark:text-indigo-300"
              />
              <div className="grid min-w-0 flex-1 gap-0.5">
                <p className="text-sm">
                  <span className="font-semibold">{obligation.label}</span>
                  {' · '}
                  <span className="text-muted-foreground">
                    {obligation.effect.carrier}’s {obligation.effect.name}
                  </span>
                </p>
                <p
                  className={cn(
                    'text-sm',
                    obligation.overdue
                      ? 'font-semibold text-red-600 dark:text-red-400'
                      : 'text-muted-foreground',
                  )}
                >
                  {dueLabel(obligation, state.day)}, or{' '}
                  <EffectTokens tokens={obligation.otherwise} />
                </p>
              </div>
              <button
                type="button"
                className={cn(buttonClass, 'text-sm')}
                onClick={() => actions.meet(obligation.id)}
              >
                Done today
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

function lastsLabel(effect: LiveEffect, day: number): string {
  if (effect.expiryDay === undefined) return 'Lasts until something ends it'
  if (effect.expiryDay === day + 1) return 'Last day today'
  return `Lasts through day ${effect.expiryDay - 1}`
}

function dueLabel(obligation: ObligationStatus, day: number): string {
  if (obligation.overdue) return `Overdue since day ${obligation.due}`
  if (obligation.due === day) return 'Due today'
  return `Due by day ${obligation.due}`
}
