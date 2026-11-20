import { z } from 'zod'

import { Content } from './content'
import { entityRefOf } from './kind'
import { Span } from './span'

/**
 * When a foretold thing is due. `within` and `after` count from the day of the event that made
 * the promise; `fullMoon` waits for the next full moon. Omit `when` when no time was set.
 */
export const ForetoldWhen = z.discriminatedUnion('type', [
  z.strictObject({
    type: z.literal('within'),
    span: Span.describe('Due at the latest this long after the event'),
  }),
  z.strictObject({
    type: z.literal('after'),
    span: Span.describe('Due once this much time has passed since the event'),
  }),
  z.strictObject({ type: z.literal('fullMoon') }),
])

export type ForetoldWhen = z.infer<typeof ForetoldWhen>

/**
 * Something promised, foretold, or bound to happen later: a delivery, a vow, a prophecy, a lock
 * that opens under a full moon. The record that made the promise owns it; the DM dashboard derives
 * the list of what is still to come.
 */
export const FORETOLD_OUTCOMES = ['cameTrue', 'abandoned'] as const

/**
 * How a promise was settled: it came true in an event, or it was abandoned in one, when nobody
 * will see it through any more.
 */
export const ForetoldOutcome = z.strictObject({
  type: z.enum(FORETOLD_OUTCOMES),
  event: entityRefOf('event').describe('The event in which it came true or was given up'),
})

export const Foretold = z.strictObject({
  what: Content.describe('What will happen, without restating the timing in `when`'),
  when: ForetoldWhen.optional(),
  outcome: ForetoldOutcome.optional().describe(
    'How it was settled. Omit while it is still to come.',
  ),
})

export type ForetoldOutcomeType = (typeof FORETOLD_OUTCOMES)[number]
export type ForetoldOutcome = z.infer<typeof ForetoldOutcome>
export type Foretold = z.infer<typeof Foretold>
