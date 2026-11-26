import { z } from 'zod'

import { spellNames } from '#/data/generated/spell-names'
import type { Effect, EffectText, EffectTrigger } from '#/definitions/effect'
import { entityRefOf, type EntityRef } from '#/definitions/kind'
import { ABILITY_KEYS, CONDITION_KEYS, rules, type Condition } from '#/lib/rules'

/**
 * Combat state that reminds the DM when a rule applies: conditions with durations, concentration,
 * and death saves. It lives on each combatant's encounter values, browser-local like HP. All logic
 * is pure; `src/lib/encounter.ts` stores it and the encounter screen shows it.
 */

const ConditionId = z.enum(CONDITION_KEYS)
const AbilityId = z.enum(ABILITY_KEYS)

/** When a condition ends. Turn boundaries refer to roster entries by id. */
const ConditionDuration = z.discriminatedUnion('kind', [
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

/**
 * Where an effect came from, so the DM can trace it: a combatant's ability (its roster id and the
 * ability's key in its stat block) or a spell from the library, cast by a combatant.
 */
export const EffectOrigin = z.discriminatedUnion('kind', [
  z.strictObject({ kind: z.literal('ability'), combatant: z.string(), ability: z.string() }),
  z.strictObject({
    kind: z.literal('spell'),
    spell: entityRefOf('spell'),
    caster: z.string().optional(),
  }),
])

const applied = {
  duration: ConditionDuration,
  /** When it was applied, so "end of its next turn" skips the turn it was applied in. */
  appliedRound: z.number().int().positive(),
  appliedDuring: z.string().optional(),
}

export const ActiveCondition = z.strictObject({
  id: z.string(),
  condition: ConditionId,
  ...applied,
  /**
   * The applied effect this condition is part of, which says where it came from. It ends and is
   * removed with that effect.
   */
  effect: z.string().optional(),
})

/**
 * A spell or ability's effect on one combatant: where it came from, how long it lasts, and what
 * it does beyond its conditions ("−2 to AC", "can't regain hit points"). Its conditions are held
 * as conditions, linked back to it, so everything that reads conditions sees them.
 */
export const AppliedEffect = z.strictObject({
  id: z.string(),
  ...applied,
  origin: EffectOrigin,
  text: z.string().trim().min(1).optional(),
})

export const DeathSaves = z.strictObject({
  successes: z.number().int().min(0).max(3),
  failures: z.number().int().min(0).max(3),
})

/** Combat fields stored on each combatant's encounter values. */
export const CombatFields = {
  conditions: z
    .array(
      // Saves from the first version of applied effects kept a copy of the origin on each
      // condition; the effect holds it now.
      z.preprocess(
        (value) =>
          value && typeof value === 'object' && 'origin' in value
            ? Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'origin'))
            : value,
        ActiveCondition,
      ),
    )
    .optional(),
  appliedEffects: z.array(AppliedEffect).optional(),
  concentration: z
    .strictObject({
      on: z.string(),
      /** The library spell, when concentration started from applying it; its effects end with it. */
      spell: entityRefOf('spell').optional(),
    })
    .optional(),
  /** A PC at 0 HP: death saves until stable, dead, or healed. */
  dying: DeathSaves.optional(),
  stable: z.boolean().optional(),
  dead: z.boolean().optional(),
  /** In its lair: its lair actions come up on initiative 20. */
  inLair: z.boolean().optional(),
  /** The lair action used most recently, which can't be used again the next round. */
  lastLairAction: z
    .strictObject({ key: z.string(), round: z.number().int().positive() })
    .optional(),
}

export type ConditionDuration = z.infer<typeof ConditionDuration>
export type ActiveCondition = z.infer<typeof ActiveCondition>
export type AppliedEffect = z.infer<typeof AppliedEffect>
export type EffectOrigin = z.infer<typeof EffectOrigin>
export type DeathSaves = z.infer<typeof DeathSaves>
export type AbilityId = z.infer<typeof AbilityId>

type CombatValues = {
  conditions?: ActiveCondition[]
  appliedEffects?: AppliedEffect[]
  concentration?: { on: string; spell?: EntityRef<'spell'> }
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

/**
 * In a duration applied to several targets, "its next turn" means each target's own turn: this
 * stands for the target until the effect is applied to one.
 */
export const EACH_TARGET = '@target'

function forTarget(choice: DurationChoice, target: string): DurationChoice {
  return 'of' in choice && choice.of === EACH_TARGET ? { ...choice, of: target } : choice
}

function durationOf(choice: DurationChoice, round: number): ConditionDuration {
  return choice.kind === 'rounds'
    ? { kind: 'rounds', rounds: choice.rounds, of: choice.of, untilRound: round + choice.rounds }
    : choice
}

export function makeCondition(
  condition: Condition,
  choice: DurationChoice,
  { id, round, active }: { id: string; round: number; active: string | undefined },
): ActiveCondition {
  return {
    id,
    condition,
    duration: durationOf(choice, round),
    appliedRound: round,
    appliedDuring: active,
  }
}

/** What the DM applies: an origin, its conditions, its rider, and how long it lasts. */
export type EffectApplication = {
  origin: EffectOrigin
  conditions: readonly Condition[]
  text?: string
  duration: DurationChoice
}

/**
 * One combatant's share of an applied effect: the effect record, and its conditions linked to it.
 * The conditions replace any the combatant already holds of the same kind.
 */
export function applyEffectTo<H extends CombatValues>(
  held: H,
  application: EffectApplication,
  {
    id,
    target,
    round,
    active,
  }: { id: string; target: string; round: number; active: string | undefined },
): H {
  const text = application.text?.trim()
  const duration = forTarget(application.duration, target)
  const effect: AppliedEffect = {
    id,
    duration: durationOf(duration, round),
    appliedRound: round,
    appliedDuring: active,
    origin: application.origin,
    ...(text ? { text } : {}),
  }
  const conditions = application.conditions.map((condition, index): ActiveCondition => ({
    ...makeCondition(condition, duration, {
      id: `${id}-${index}`,
      round,
      active,
    }),
    effect: id,
  }))
  return {
    ...held,
    appliedEffects: [...(held.appliedEffects ?? []), effect],
    conditions: [...replaceable(held, application.conditions), ...conditions],
  }
}

/**
 * The conditions a combatant keeps when it gains `adding`: a plain condition of the same kind is
 * replaced, but one held by another effect stays, since that effect still has to end on its own.
 */
export function replaceable(held: CombatValues, adding: readonly Condition[]) {
  const live = new Set((held.appliedEffects ?? []).map((effect) => effect.id))
  return (held.conditions ?? []).filter(
    (existing) =>
      (existing.effect !== undefined && live.has(existing.effect)) ||
      !adding.includes(existing.condition),
  )
}

/**
 * When a caster stops concentrating, the spell it was holding ends on everyone: the effects that
 * came from that casting are removed with their conditions.
 */
export function endConcentrationEffects<V extends Readonly<Record<string, CombatValues>>>(
  values: V,
  caster: string,
  spell: EntityRef<'spell'>,
): V {
  const held = (origin: EffectOrigin) =>
    origin.kind === 'spell' && origin.caster === caster && origin.spell.key === spell.key
  return Object.fromEntries(
    Object.entries(values).map(([combatant, combatantValues]) => [
      combatant,
      (combatantValues.appliedEffects ?? [])
        .filter((effect) => held(effect.origin))
        .reduce((current, effect) => removeEffectFrom(current, effect.id), combatantValues),
    ]),
  ) as V
}

/** End an applied effect early, with the conditions that came with it. */
export function removeEffectFrom<H extends CombatValues>(held: H, effectId: string): H {
  return {
    ...held,
    appliedEffects: (held.appliedEffects ?? []).filter((effect) => effect.id !== effectId),
    conditions: (held.conditions ?? []).filter((condition) => condition.effect !== effectId),
  }
}

/**
 * Remove one condition. An effect that is left with neither conditions nor a rider of its own has
 * nothing more to track, so it goes too.
 */
export function removeConditionFrom<H extends CombatValues>(held: H, conditionId: string): H {
  const removed = held.conditions?.find((condition) => condition.id === conditionId)
  const conditions = (held.conditions ?? []).filter((condition) => condition.id !== conditionId)
  const effects = (held.appliedEffects ?? []).filter(
    (effect) =>
      effect.id !== removed?.effect ||
      effect.text !== undefined ||
      conditions.some((condition) => condition.effect === effect.id),
  )
  return {
    ...held,
    conditions,
    ...(held.appliedEffects ? { appliedEffects: effects } : {}),
  }
}

/** Names an origin is told by: combatants by roster id, and abilities by their key. */
export type OriginNames = {
  nameOf: (id: string) => string
  /** The ability's name in that combatant's stat block, if it is still in the fight. */
  abilityName: (combatant: string, key: string) => string | undefined
}

/** "Hold Person", "Bite": an origin's own name, short enough for a marker. */
export function originName(origin: EffectOrigin, { abilityName }: OriginNames) {
  return origin.kind === 'spell'
    ? (spellNames[origin.spell.key] ?? origin.spell.key)
    : (abilityName(origin.combatant, origin.ability) ?? origin.ability)
}

/** "Hold Person, cast by Swift", "Wolf 1’s Bite": where an effect came from, for the DM to read. */
export function describeOrigin(origin: EffectOrigin, names: OriginNames) {
  const name = originName(origin, names)
  if (origin.kind === 'spell')
    return origin.caster ? `${name}, cast by ${names.nameOf(origin.caster)}` : name
  return `${names.nameOf(origin.combatant)}’s ${name}`
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
      return `save ends: DC ${duration.dc} ${rules[duration.ability].name}`
  }
}

/** Whether a condition ends at this turn boundary. */
function expiresAt(
  held: Pick<ActiveCondition, 'duration' | 'appliedRound' | 'appliedDuring'>,
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
  /** An applied effect ended; its linked conditions ended with it. */
  | { kind: 'effect-expired'; combatant: string; effect: AppliedEffect; conditions: Condition[] }
  | {
      kind: 'effect-save'
      combatant: string
      effect: AppliedEffect
      dc: number
      ability: AbilityId
    }
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

  const endsNow = (held: Pick<ActiveCondition, 'duration' | 'appliedRound' | 'appliedDuring'>) =>
    (ending !== undefined && expiresAt(held, { kind: 'end', of: ending, round: endingRound })) ||
    expiresAt(held, { kind: 'start', of: starting, round: startingRound })
  for (const [combatant, held] of Object.entries(values)) {
    if (!held.conditions?.length && !held.appliedEffects?.length) continue
    const endingEffects = new Set(
      (held.appliedEffects ?? []).filter(endsNow).map((effect) => effect.id),
    )
    const kept = (held.conditions ?? []).filter((condition) => {
      // A linked condition lasts exactly as long as its effect, which says it ended.
      if (condition.effect && held.appliedEffects?.some(({ id }) => id === condition.effect))
        return !endingEffects.has(condition.effect)
      const ends = endsNow(condition)
      if (ends) notes.push({ kind: 'expired', combatant, condition: condition.condition })
      return !ends
    })
    const keptEffects = (held.appliedEffects ?? []).filter((effect) => {
      if (!endingEffects.has(effect.id)) return true
      notes.push({
        kind: 'effect-expired',
        combatant,
        effect,
        conditions: (held.conditions ?? [])
          .filter((condition) => condition.effect === effect.id)
          .map((condition) => condition.condition),
      })
      return false
    })
    if (
      kept.length !== (held.conditions?.length ?? 0) ||
      keptEffects.length !== (held.appliedEffects?.length ?? 0)
    )
      next[combatant] = {
        ...held,
        ...(held.conditions ? { conditions: kept } : {}),
        ...(held.appliedEffects ? { appliedEffects: keptEffects } : {}),
      }
  }

  if (ending !== undefined) {
    for (const effect of next[ending]?.appliedEffects ?? []) {
      if (effect.duration.kind === 'save-ends')
        notes.push({
          kind: 'effect-save',
          combatant: ending,
          effect,
          dc: effect.duration.dc,
          ability: effect.duration.ability,
        })
    }
    const effectIds = new Set((next[ending]?.appliedEffects ?? []).map((effect) => effect.id))
    for (const condition of next[ending]?.conditions ?? []) {
      // The effect's own save covers its conditions.
      if (condition.effect && effectIds.has(condition.effect)) continue
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

/** Concentration save DC after taking damage: 10 or half the damage, whichever is higher, up to 30. */
export function concentrationDc(damage: number) {
  return Math.min(30, Math.max(10, Math.floor(damage / 2)))
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

// --- Lair actions -------------------------------------------------------------------------------

export type LairPrompt = {
  combatant: string
  name: string
  /** What it did this round, once the DM has chosen. */
  used?: string
  options: { key: string; name: string; blocked: boolean }[]
}

/**
 * Lair actions come up on initiative 20, before anyone else acts in the round. Each creature in
 * its lair picks one, and can't repeat the one it used last round.
 */
export function lairPrompts(
  creatures: readonly {
    id: string
    name: string
    inLair: boolean
    actions: readonly { key: string; name: string }[]
    lastLairAction?: { key: string; round: number }
  }[],
  round: number,
): LairPrompt[] {
  return creatures
    .filter((creature) => creature.inLair && creature.actions.length > 0)
    .map((creature) => ({
      combatant: creature.id,
      name: creature.name,
      used:
        creature.lastLairAction?.round === round
          ? creature.actions.find((action) => action.key === creature.lastLairAction?.key)?.name
          : undefined,
      options: creature.actions.map((action) => ({
        key: action.key,
        name: action.name,
        blocked:
          creature.lastLairAction?.round === round - 1 &&
          creature.lastLairAction.key === action.key,
      })),
    }))
}

// --- Campaign effects -----------------------------------------------------------------------------

export type EffectReminder = {
  combatant: string
  name: string
  effect: string
  icon: string
  reminder: EffectText
}

/** The reminders campaign effects ask for at a trigger, such as the start of an encounter. */
export function effectTriggerReminders(
  combatants: readonly {
    id: string
    name: string
    effects: readonly Pick<Effect, 'name' | 'icon' | 'triggers'>[]
  }[],
  trigger: EffectTrigger,
): EffectReminder[] {
  return combatants.flatMap((combatant) =>
    combatant.effects.flatMap((effect) =>
      (effect.triggers ?? [])
        .filter((entry) => entry.on === trigger)
        .map((entry) => ({
          combatant: combatant.id,
          name: combatant.name,
          effect: effect.name,
          icon: effect.icon,
          reminder: entry.reminder,
        })),
    ),
  )
}
