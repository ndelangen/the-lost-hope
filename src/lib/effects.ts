import type { Effect } from '#/definitions/effect'
import type { Span } from '#/definitions/span'

export type EffectStatus = 'active' | 'ended' | 'expired'

export const EFFECT_STATUS_LABELS: Record<EffectStatus, string> = {
  active: 'Active',
  ended: 'Lifted',
  expired: 'Expired',
}

/** Whole campaign days a span covers. Months count as 30 days and years as 365. */
export function spanDays(span: Span): number {
  return (
    Math.ceil((span.hours ?? 0) / 24) +
    (span.days ?? 0) +
    (span.months ?? 0) * 30 +
    (span.years ?? 0) * 365
  )
}

export function formatSpan(span: Span): string {
  const parts: [number | undefined, string][] = [
    [span.years, 'year'],
    [span.months, 'month'],
    [span.days, 'day'],
    [span.hours, 'hour'],
  ]
  return parts
    .filter((part): part is [number, string] => Boolean(part[0]))
    .map(([count, unit]) => `${count} ${unit}${count === 1 ? '' : 's'}`)
    .join(' ')
}

/** The campaign day on which a timed effect runs out, or undefined when it has no duration. */
export function effectExpiryDay(effect: Pick<Effect, 'duration'>, beganDay: number) {
  return effect.duration ? beganDay + spanDays(effect.duration) : undefined
}

/**
 * Derives an effect's status: lifted when an event ended it, expired once its duration has run
 * out by the current campaign day, and active otherwise.
 */
export function effectStatus(
  effect: Pick<Effect, 'ended' | 'duration'>,
  beganDay: number,
  currentDay: number,
): EffectStatus {
  if (effect.ended) return 'ended'
  const expiry = effectExpiryDay(effect, beganDay)
  return expiry !== undefined && currentDay >= expiry ? 'expired' : 'active'
}
