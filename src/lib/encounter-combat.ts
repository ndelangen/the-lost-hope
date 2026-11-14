import { z } from 'zod'

import { CONDITIONS, type Condition } from '#/definitions/rules-glossary'

/**
 * Combat state that reminds the DM when a rule applies: conditions with durations, concentration,
 * and death saves. It lives on each combatant's encounter values, browser-local like HP. All logic
 * is pure; `src/lib/encounter.ts` stores it and the encounter screen shows it.
 */

const ConditionId = z.enum(Object.keys(CONDITIONS) as [Condition, ...Condition[]])
const AbilityId = z.enum(['str', 'dex', 'con', 'int', 'wis', 'cha'])

/** When a condition ends. Turn boundaries refer to roster entries by id. */
export const ConditionDuration = z.discriminatedUnion('kind', [
  z.strictObject({ kind: z.literal('until-removed') }),
  z.strictObject({ kind: z.literal('end-of-turn'), of: z.string() }),
  z.strictObject({ kind: z.literal('start-of-turn'), of: z.string() }),
  z.strictObject({
    kind: z.literal('rounds'),
    rounds: z.number().int().positive(),
    /** Expires at the start of this combatant's turn once `untilRound` arrives. */
    of: z.string(),
    untilRound: z.number().int().positive(),
  }),
  z.strictObject({
    kind: z.literal('save-ends'),
    dc: z.number().int().positive(),
    ability: AbilityId,
  }),
])

export const ActiveCondition = z.strictObject({
  id: z.string(),
  condition: ConditionId,
  duration: ConditionDuration,
  /** When it was applied, so "end of its next turn" skips the turn it was applied in. */
  appliedRound: z.number().int().positive(),
  appliedDuring: z.string().optional(),
})

export const DeathSaves = z.strictObject({
  successes: z.number().int().min(0).max(3),
  failures: z.number().int().min(0).max(3),
})

/** Combat fields stored on each combatant's encounter values. */
export const CombatFields = {
  conditions: z.array(ActiveCondition).optional(),
  concentration: z.strictObject({ on: z.string() }).optional(),
  /** A PC at 0 HP: death saves until stable, dead, or healed. */
  dying: DeathSaves.optional(),
  stable: z.boolean().optional(),
  dead: z.boolean().optional(),
}

export type ConditionDuration = z.infer<typeof ConditionDuration>
export type ActiveCondition = z.infer<typeof ActiveCondition>
export type DeathSaves = z.infer<typeof DeathSaves>
export type AbilityId = z.infer<typeof AbilityId>

type CombatValues = {
  conditions?: ActiveCondition[]
  concentration?: { on: string }
  dying?: DeathSaves
  stable?: boolean
  dead?: boolean
}

// --- Durations ----------------------------------------------------------------------------------

export type DurationChoice =
  | { kind: 'until-removed' }
  | { kind: 'end-of-turn'; of: string }
  | { kind: 'start-of-turn'; of: string }
  | { kind: 'rounds'; rounds: number; of: string }
  | { kind: 'save-ends'; dc: number; ability: AbilityId }

export function makeCondition(
  condition: Condition,
  choice: DurationChoice,
  { id, round, active }: { id: string; round: number; active: string | undefined },
): ActiveCondition {
  const duration: ConditionDuration =
    choice.kind === 'rounds'
      ? { kind: 'rounds', rounds: choice.rounds, of: choice.of, untilRound: round + choice.rounds }
      : choice
  return { id, condition, duration, appliedRound: round, appliedDuring: active }
}

const ABILITY_NAME: Record<AbilityId, string> = {
  str: 'Strength',
  dex: 'Dexterity',
  con: 'Constitution',
  int: 'Intelligence',
  wis: 'Wisdom',
  cha: 'Charisma',
}

/** "until end of Wolfie 1's next turn", "save ends (DC 13 Con)" */
export function describeDuration(duration: ConditionDuration, nameOf: (id: string) => string) {
  switch (duration.kind) {
    case 'until-removed':
      return 'until removed'
    case 'end-of-turn':
      return `until the end of ${nameOf(duration.of)}’s next turn`
    case 'start-of-turn':
      return `until the start of ${nameOf(duration.of)}’s next turn`
    case 'rounds':
      return `${duration.rounds} ${duration.rounds === 1 ? 'round' : 'rounds'} (ends round ${duration.untilRound})`
    case 'save-ends':
      return `save ends: DC ${duration.dc} ${ABILITY_NAME[duration.ability]}`
  }
}

/** Whether a condition ends at this turn boundary. */
function expiresAt(
  held: ActiveCondition,
  boundary: { kind: 'end' | 'start'; of: string; round: number },
) {
  const { duration } = held
  if (duration.kind === 'end-of-turn' && boundary.kind === 'end' && duration.of === boundary.of)
    // "Next turn": the turn in which it was applied does not count.
    return !(held.appliedDuring === boundary.of && held.appliedRound === boundary.round)
  if (duration.kind === 'start-of-turn' && boundary.kind === 'start')
    return duration.of === boundary.of
  if (duration.kind === 'rounds' && boundary.kind === 'start')
    return duration.of === boundary.of && boundary.round >= duration.untilRound
  return false
}

// --- Turn advance -------------------------------------------------------------------------------

export type TurnNote =
  | { kind: 'expired'; combatant: string; condition: Condition }
  | { kind: 'save-to-end'; combatant: string; condition: Condition; dc: number; ability: AbilityId }
  | { kind: 'legendary-refilled'; combatant: string; uses: number }

type Values = Readonly<Record<string, CombatValues & { uses?: Record<string, number> }>>

/**
 * Apply the turn boundary between `ending` and `starting`: conditions expire, save-ends conditions
 * prompt the creature whose turn ended, and the starting creature's legendary pool refills.
 */
export function applyTurnBoundary<V extends Values>(
  values: V,
  {
    ending,
    starting,
    endingRound,
    startingRound,
    legendaryUses,
    legendaryPool,
  }: {
    ending: string | undefined
    starting: string
    endingRound: number
    startingRound: number
    /** Legendary pool size for the starting combatant, if it has legendary actions. */
    legendaryUses: number | undefined
    legendaryPool: string
  },
): { values: V; notes: TurnNote[] } {
  const notes: TurnNote[] = []
  const next: Record<string, CombatValues & { uses?: Record<string, number> }> = { ...values }

  for (const [combatant, held] of Object.entries(values)) {
    if (!held.conditions?.length) continue
    const kept = held.conditions.filter((condition) => {
      const ends =
        (ending !== undefined &&
          expiresAt(condition, { kind: 'end', of: ending, round: endingRound })) ||
        expiresAt(condition, { kind: 'start', of: starting, round: startingRound })
      if (ends) notes.push({ kind: 'expired', combatant, condition: condition.condition })
      return !ends
    })
    if (kept.length !== held.conditions.length) next[combatant] = { ...held, conditions: kept }
  }

  if (ending !== undefined) {
    for (const condition of next[ending]?.conditions ?? []) {
      if (condition.duration.kind === 'save-ends')
        notes.push({
          kind: 'save-to-end',
          combatant: ending,
          condition: condition.condition,
          dc: condition.duration.dc,
          ability: condition.duration.ability,
        })
    }
  }

  if (legendaryUses !== undefined) {
    const current = next[starting] ?? {}
    if ((current.uses?.[legendaryPool] ?? legendaryUses) < legendaryUses)
      notes.push({ kind: 'legendary-refilled', combatant: starting, uses: legendaryUses })
    const { [legendaryPool]: _spent, ...uses } = current.uses ?? {}
    next[starting] = { ...current, uses }
  }

  return { values: next as V, notes }
}

// --- Concentration ------------------------------------------------------------------------------

/** Concentration save DC after taking damage: 10 or half the damage, whichever is higher. */
export function concentrationDc(damage: number) {
  return Math.max(10, Math.floor(damage / 2))
}

// --- Death saves --------------------------------------------------------------------------------

export function recordDeathSave(saves: DeathSaves, result: 'success' | 'failure', count = 1) {
  const next =
    result === 'success'
      ? { ...saves, successes: Math.min(3, saves.successes + count) }
      : { ...saves, failures: Math.min(3, saves.failures + count) }
  return {
    saves: next,
    outcome:
      next.failures >= 3
        ? ('dead' as const)
        : next.successes >= 3
          ? ('stable' as const)
          : undefined,
  }
}

// --- Reminders ----------------------------------------------------------------------------------

/** Abilities with a dice recharge ("Recharge 5–6") are rolled for at the start of each turn. */
export function rollsToRecharge(recharge: string | undefined) {
  return recharge !== undefined && /^Recharge \d/.test(recharge)
}

export type TurnReminder =
  | { kind: 'recharge'; useKey: string; name: string; recharge: string }
  | { kind: 'condition'; held: ActiveCondition }
  | { kind: 'concentrating'; on: string }
  | { kind: 'dying' }

/**
 * What applies as a combatant's turn starts: spent abilities to roll for, conditions it is under,
 * concentration to keep in mind, and a death save when it is dying.
 */
export function startOfTurnReminders({
  abilities,
  values,
}: {
  abilities: readonly {
    useKey: string
    name: string
    recharge?: string
    count?: { uses: number; maxUses: number }
  }[]
  values: CombatValues | undefined
}): TurnReminder[] {
  const reminders: TurnReminder[] = []
  if (values?.dying) reminders.push({ kind: 'dying' })
  for (const ability of abilities) {
    if (
      ability.count &&
      ability.count.uses < ability.count.maxUses &&
      rollsToRecharge(ability.recharge)
    )
      reminders.push({
        kind: 'recharge',
        useKey: ability.useKey,
        name: ability.name,
        recharge: ability.recharge!,
      })
  }
  for (const held of values?.conditions ?? []) reminders.push({ kind: 'condition', held })
  if (values?.concentration) reminders.push({ kind: 'concentrating', on: values.concentration.on })
  return reminders
}
