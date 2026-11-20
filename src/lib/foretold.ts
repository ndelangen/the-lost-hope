import type { Content } from '#/definitions/content'
import type { BondOutcomes } from '#/definitions/event'
import type { Foretold, ForetoldOutcome, ForetoldWhen } from '#/definitions/foretold'
import { bondOutcomeProse } from '#/lib/bond-outcomes'
import { formatSpan, spanDays } from '#/lib/effects'

/** A record that can own promises: the event that made them, or an item bound to act later. */
export type ForetoldSource =
  | { kind: 'event'; slug: string; name: string; day: number; foretold?: readonly Foretold[] }
  | { kind: 'item'; slug: string; name: string; foretold?: readonly Foretold[] }

export type ForetoldStatus = 'overdue' | 'dueToday' | 'upcoming' | 'fullMoon' | 'open'

/** One promise as the DM dashboard lists it. */
export type ForetoldEntry = {
  id: string
  source: { kind: 'event' | 'item'; slug: string; name: string; day?: number }
  what: Content
  when?: ForetoldWhen
  /** The campaign day it is due, when `when` counts from a known day. */
  dueDay?: number
  status: ForetoldStatus
  outcome?: ForetoldOutcome
}

/** What happened, without the separately rendered promises. */
export function eventNarrative(event: { notes: Content; bondOutcomes?: BondOutcomes }): Content {
  return [...event.notes, ...bondOutcomeProse(event.bondOutcomes)]
}

/** An event's full account: what happened, then what was promised or foretold in it. */
export function eventProse(event: {
  notes: Content
  bondOutcomes?: BondOutcomes
  foretold?: readonly Foretold[]
}): Content {
  return [...eventNarrative(event), ...(event.foretold ?? []).flatMap((entry) => entry.what)]
}

export function foretoldDueDay(when: ForetoldWhen | undefined, fromDay: number | undefined) {
  if (!when || when.type === 'fullMoon' || fromDay === undefined) return undefined
  return fromDay + spanDays(when.span)
}

/** How a settled promise reads: `Came true` or `Abandoned`. */
export function formatForetoldOutcome(outcome: Pick<ForetoldOutcome, 'type'>): string {
  return outcome.type === 'cameTrue' ? 'Came true' : 'Abandoned'
}

/** How a promise's timing reads on a record page, e.g. `Within 3 days`. */
export function formatForetoldWhen(when: ForetoldWhen | undefined): string {
  if (!when) return 'No set time'
  if (when.type === 'fullMoon') return 'Next full moon'
  return `${when.type === 'within' ? 'Within' : 'After'} ${formatSpan(when.span)}`
}

/** How a promise's timing reads on the dashboard on a given campaign day. */
export function foretoldDueLabel(entry: Pick<ForetoldEntry, 'when' | 'dueDay'>, today: number) {
  if (entry.dueDay === undefined) return formatForetoldWhen(entry.when)
  const left = entry.dueDay - today
  const by = entry.when?.type === 'within' ? 'by' : 'from'
  if (left < 0) return `Overdue · ${by} day ${entry.dueDay}`
  if (left === 0) return `Today · day ${entry.dueDay}`
  return `In ${left} day${left === 1 ? '' : 's'} · ${by} day ${entry.dueDay}`
}

function statusOf(when: ForetoldWhen | undefined, dueDay: number | undefined, today: number) {
  if (dueDay !== undefined) {
    if (dueDay < today) return 'overdue'
    return dueDay === today ? 'dueToday' : 'upcoming'
  }
  return when?.type === 'fullMoon' ? 'fullMoon' : 'open'
}

const STATUS_ORDER: Record<ForetoldStatus, number> = {
  overdue: 0,
  dueToday: 1,
  upcoming: 2,
  fullMoon: 3,
  open: 4,
}

/**
 * Every promise the records own, split into what is still to come (most pressing first: overdue,
 * due today, by due day, next full moon, then those with no set time), what already came true, and
 * what was abandoned.
 */
export function foretoldEntries(sources: readonly ForetoldSource[], today: number) {
  const entries = sources.flatMap((source) =>
    (source.foretold ?? []).map((entry, index): ForetoldEntry => {
      const day = source.kind === 'event' ? source.day : undefined
      const dueDay = foretoldDueDay(entry.when, day)
      return {
        id: `${source.kind}:${source.slug}:${index}`,
        source: { kind: source.kind, slug: source.slug, name: source.name, day },
        what: entry.what,
        when: entry.when,
        dueDay,
        status: statusOf(entry.when, dueDay, today),
        outcome: entry.outcome,
      }
    }),
  )
  const pending = entries
    .filter((entry) => !entry.outcome)
    .toSorted(
      (a, b) =>
        STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
        (a.dueDay ?? 0) - (b.dueDay ?? 0) ||
        (b.source.day ?? 0) - (a.source.day ?? 0),
    )
  return {
    pending,
    cameTrue: entries.filter((entry) => entry.outcome?.type === 'cameTrue'),
    abandoned: entries.filter((entry) => entry.outcome?.type === 'abandoned'),
  }
}
