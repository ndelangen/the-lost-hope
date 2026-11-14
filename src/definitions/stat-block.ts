import { z } from 'zod'

import { entityRefOf } from './kind'
import { CONDITIONS, STANDARD_ACTIONS, type Condition, type StandardAction } from './rules-glossary'

export const ABILITY_TIMINGS = ['action', 'bonus action', 'reaction', 'trait'] as const

export type AbilityTiming = (typeof ABILITY_TIMINGS)[number]

export const ABILITY_IDS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const
export const SPEED_MODES = ['walk', 'climb', 'fly', 'swim', 'burrow'] as const
export const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'] as const
export const CREATURE_TYPES = [
  'aberration',
  'beast',
  'celestial',
  'construct',
  'dragon',
  'elemental',
  'fey',
  'fiend',
  'giant',
  'humanoid',
  'monstrosity',
  'ooze',
  'plant',
  'undead',
] as const
export const CHALLENGE_RATINGS = [
  '0',
  '1/8',
  '1/4',
  '1/2',
  ...Array.from({ length: 30 }, (_, index) => String(index + 1)),
] as [string, ...string[]]
export const SKILLS = {
  acrobatics: 'dex',
  animalHandling: 'wis',
  arcana: 'int',
  athletics: 'str',
  deception: 'cha',
  history: 'int',
  insight: 'wis',
  intimidation: 'cha',
  investigation: 'int',
  medicine: 'wis',
  nature: 'int',
  perception: 'wis',
  performance: 'cha',
  persuasion: 'cha',
  religion: 'int',
  sleightOfHand: 'dex',
  stealth: 'dex',
  survival: 'wis',
} as const
export const SENSES = ['blindsight', 'darkvision', 'tremorsense', 'truesight'] as const
export const DAMAGE_TYPES = [
  'acid',
  'bludgeoning',
  'cold',
  'fire',
  'force',
  'lightning',
  'necrotic',
  'piercing',
  'poison',
  'psychic',
  'radiant',
  'slashing',
  'thunder',
] as const

export type AbilityId = (typeof ABILITY_IDS)[number]
export type Skill = keyof typeof SKILLS
export type ChallengeRating = (typeof CHALLENGE_RATINGS)[number]

const AbilityId = z.enum(ABILITY_IDS)
const SpeedMode = z.enum(SPEED_MODES)
const DamageType = z.enum(DAMAGE_TYPES)
const ConditionId = z.enum(Object.keys(CONDITIONS) as [Condition, ...Condition[]])
const Proficiency = z
  .enum(['proficient', 'expert'])
  .describe('Expert doubles the proficiency bonus')

/**
 * Ability rules text as tokens: plain strings, and typed references the tracker answers in place
 * from this stat block — speeds, sibling abilities by key, numbers, conditions, and actions.
 */
export const AbilityTextToken = z.union([
  z.string().min(1),
  z.strictObject({ speed: SpeedMode, times: z.number().positive().optional() }),
  z.strictObject({ ability: z.string().min(1).describe('Key of another ability in this block') }),
  z.strictObject({ dc: AbilityId.describe('Save DC: 8 + proficiency + this modifier') }),
  z.strictObject({ mod: AbilityId }),
  z.strictObject({ pb: z.literal(true) }),
  z.strictObject({ condition: ConditionId }),
  z.strictObject({
    action: z.enum(Object.keys(STANDARD_ACTIONS) as [StandardAction, ...StandardAction[]]),
  }),
])

export type AbilityTextToken = z.infer<typeof AbilityTextToken>

/** One damage roll, e.g. `1d10` piercing plus the attacking ability modifier. */
const Damage = z.strictObject({
  dice: z.string().regex(/^\d+d(4|6|8|10|12|20)$/, 'Use dice like `2d6`'),
  type: DamageType,
  addModifier: z
    .boolean()
    .default(false)
    .describe('Add the attack ability modifier, as weapon and natural attacks usually do'),
})

/** An attack roll. The to-hit bonus and damage averages are derived from the scores and CR. */
const Attack = z.discriminatedUnion('kind', [
  z.strictObject({
    kind: z.literal('melee'),
    ability: AbilityId,
    reach: z.number().int().positive().default(5).describe('Feet'),
    damage: z.array(Damage).min(1),
  }),
  z.strictObject({
    kind: z.literal('ranged'),
    ability: AbilityId,
    range: z.tuple([z.number().int().positive(), z.number().int().positive()]).describe('Feet'),
    damage: z.array(Damage).min(1),
  }),
])

export type Attack = z.infer<typeof Attack>

const Ability = z.strictObject({
  key: z
    .string()
    .regex(/^[a-z][a-z0-9-]*$/)
    .describe('Stable id, unique within the stat block; other abilities refer to it'),
  name: z.string().trim().min(1),
  icon: z
    .string()
    .describe(
      'Icon-catalog id depicting this ability, e.g. `gi/GiFangs` — see src/lib/ability-icons.tsx',
    ),
  attack: Attack.optional(),
  text: z
    .array(AbilityTextToken)
    .default([])
    .describe(
      'Rules text as read at the table; for an attack, only what happens beyond the damage',
    ),
  intent: z
    .enum(['damage', 'healing', 'support'])
    .default('support')
    .describe('Colors the ability control'),
  uses: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Uses before the ability needs recharging. Omit for unlimited use.'),
  recharge: z
    .string()
    .optional()
    .describe('When the DM may mark it ready again, e.g. `Recharge 5–6`. Recharge stays manual.'),
})

export type Ability = z.infer<typeof Ability>

const Score = z.number().int().min(1).max(30)

/** Where a stat block comes from: SRD 5.2.1 creatures by Open5e key, and what was changed. */
const Source = z
  .strictObject({
    adaptedFrom: z
      .array(z.string().regex(/^srd-2024_[a-z0-9-]+$/, 'Use an Open5e SRD 5.2.1 key'))
      .describe('Open5e keys, e.g. `srd-2024_dire-wolf`; empty for pure homebrew'),
    changes: z.string().trim().min(1).optional().describe('What differs from the SRD creature'),
  })
  .refine((source) => source.adaptedFrom.length > 0 || source.changes, {
    message: 'A homebrew stat block must describe itself in `changes`',
  })

/**
 * DM-only 5e statistics for an NPC, beast, or shared creature. Only base facts are stored:
 * proficiency bonus, hit points, save and skill bonuses, passive Perception, to-hit bonuses,
 * damage averages and save DCs are derived in `src/lib/stat-block.ts`.
 */
export const StatBlock = z
  .strictObject({
    size: z.enum(SIZES),
    type: z.enum(CREATURE_TYPES),
    cr: z.enum(CHALLENGE_RATINGS),
    ac: z.number().int().nonnegative(),
    armor: z.string().optional().describe('What gives the AC, e.g. `chain mail, shield`'),
    hitDice: z.string().regex(/^\d+d(4|6|8|10|12|20)$/, 'Use hit dice like `3d10`'),
    speed: z
      .partialRecord(SpeedMode, z.number().nonnegative())
      .refine((speed) => speed.walk !== undefined, 'Every creature needs a walk speed (0 if none)')
      .describe('Feet'),
    scores: z.strictObject({
      str: Score,
      dex: Score,
      con: Score,
      int: Score,
      wis: Score,
      cha: Score,
    }),
    saves: z.partialRecord(AbilityId, Proficiency).optional(),
    skills: z
      .partialRecord(z.enum(Object.keys(SKILLS) as [Skill, ...Skill[]]), Proficiency)
      .optional(),
    senses: z
      .partialRecord(z.enum(SENSES), z.number().int().positive())
      .optional()
      .describe('Feet'),
    damageVulnerabilities: z.array(DamageType).optional(),
    damageResistances: z.array(DamageType).optional(),
    damageImmunities: z.array(DamageType).optional(),
    conditionImmunities: z.array(ConditionId).optional(),
    abilities: z.array(Ability.extend({ timing: z.enum(ABILITY_TIMINGS) })).default([]),
    legendary: z
      .strictObject({
        uses: z
          .number()
          .int()
          .positive()
          .describe('Shared pool, refilled at the start of its turn'),
        actions: z.array(Ability).min(1),
      })
      .optional(),
    source: Source,
  })
  .superRefine((block, context) => {
    const all = [...block.abilities, ...(block.legendary?.actions ?? [])]
    const keys = new Set<string>()
    for (const ability of all) {
      if (keys.has(ability.key))
        context.addIssue({ code: 'custom', message: `Duplicate ability key: ${ability.key}` })
      keys.add(ability.key)
    }
    for (const ability of all) {
      for (const token of ability.text) {
        if (typeof token === 'string') continue
        if ('ability' in token && !keys.has(token.ability))
          context.addIssue({
            code: 'custom',
            message: `${ability.name} refers to a missing ability: ${token.ability}`,
          })
        if ('speed' in token && block.speed[token.speed] === undefined)
          context.addIssue({
            code: 'custom',
            message: `${ability.name} refers to a missing ${token.speed} speed`,
          })
      }
    }
  })

export type StatBlock = z.infer<typeof StatBlock>
export type TimedAbility = StatBlock['abilities'][number]

/**
 * An NPC's or beast's statistics: its own stat block, or a reference to the shared creature it is
 * one of (`refs.creatures.*`), so several records never carry copies of the same numbers.
 */
export const OwnOrSharedStatBlock = z.union([StatBlock, entityRefOf('creature')])

export type OwnOrSharedStatBlock = z.infer<typeof OwnOrSharedStatBlock>
