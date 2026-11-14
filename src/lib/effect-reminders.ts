import type { Effect, EffectTrigger, EffectText, EffectTextToken } from '#/definitions/effect'
import type { EntityRef } from '#/definitions/kind'

import { spanDays } from './effects'

/**
 * Browser-local live state for effects during play (see issue #171). Campaign source stays
 * untouched: the DM advances the live day, fires triggers, and records when an obligation was met.
 */
export type EffectLiveState = {
  /** The live campaign day, advanced by the DM's New day control. */
  day: number
  /** The live day each obligation was last met, keyed by `obligationKey`. */
  met: Record<string, number>
  /** The trigger the DM fired last, whose reminders are showing. */
  fired?: { trigger: EffectTrigger; day: number; dismissed: string[] }
}

/** An active effect as the DM sees it in play. */
export type LiveEffect = {
  slug: string
  name: string
  /** Name of the PC, NPC, or beast carrying it. */
  carrier: string
  /** Campaign day of the event in which it began. */
  beganDay: number
  data: Effect
}

export type Reminder = { id: string; effect: LiveEffect; text: EffectText }

export type ObligationStatus = {
  id: string
  effect: LiveEffect
  label: string
  otherwise: readonly EffectTextToken[]
  /** Last live day it was met, or the day the effect began when never met. */
  since: number
  /** Live day by which it must be met again. */
  due: number
  overdue: boolean
}

export function obligationKey(effectSlug: string, label: string): string {
  return `${effectSlug}:${label}`
}

export function initialLiveState(day: number): EffectLiveState {
  return { day, met: {} }
}

/** Fires a trigger. A new campaign day also advances the live day. */
export function fireTrigger(state: EffectLiveState, trigger: EffectTrigger): EffectLiveState {
  const day = trigger === 'newDay' ? state.day + 1 : state.day
  return { ...state, day, fired: { trigger, day, dismissed: [] } }
}

export function dismissReminder(state: EffectLiveState, id: string): EffectLiveState {
  if (!state.fired) return state
  const dismissed = [...state.fired.dismissed, id]
  return { ...state, fired: { ...state.fired, dismissed } }
}

export function closeReminders(state: EffectLiveState): EffectLiveState {
  const { fired: _, ...rest } = state
  return rest
}

export function meetObligation(state: EffectLiveState, id: string): EffectLiveState {
  return { ...state, met: { ...state.met, [id]: state.day } }
}

/** Every reminder the effects ask for when the trigger happens. */
export function triggerReminders(
  effects: readonly LiveEffect[],
  trigger: EffectTrigger,
): Reminder[] {
  return effects.flatMap((effect) =>
    (effect.data.triggers ?? [])
      .filter((candidate) => candidate.on === trigger)
      .map((candidate) => ({
        id: `${effect.slug}:${candidate.on}`,
        effect,
        text: candidate.reminder,
      })),
  )
}

/** The reminders of the trigger the DM fired last that are still showing. */
export function pendingReminders(
  state: EffectLiveState,
  effects: readonly LiveEffect[],
): Reminder[] {
  const fired = state.fired
  if (!fired) return []
  return triggerReminders(effects, fired.trigger).filter(
    (reminder) => !fired.dismissed.includes(reminder.id),
  )
}

/** The effects carried by one of the given records. */
export function effectsCarriedBy(
  effects: readonly LiveEffect[],
  carriers: readonly EntityRef[],
): LiveEffect[] {
  return effects.filter((effect) =>
    carriers.some(
      (carrier) => carrier.ref === effect.data.on.ref && carrier.key === effect.data.on.key,
    ),
  )
}

/** Every obligation of the active effects with its live deadline, most urgent first. */
export function obligationStatuses(
  state: EffectLiveState,
  effects: readonly LiveEffect[],
): ObligationStatus[] {
  return effects
    .flatMap((effect) =>
      (effect.data.obligations ?? []).map((obligation) => {
        const id = obligationKey(effect.slug, obligation.label)
        const since = state.met[id] ?? effect.beganDay
        const due = since + Math.max(1, spanDays(obligation.within))
        return {
          id,
          effect,
          label: obligation.label,
          otherwise: obligation.otherwise,
          since,
          due,
          overdue: state.day > due,
        }
      }),
    )
    .toSorted((a, b) => a.due - b.due || a.effect.name.localeCompare(b.effect.name))
}
