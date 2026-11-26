import { z } from 'zod'

import { ABILITY_KEYS, CREATURE_TYPE_KEYS, SENSE_KEYS, SIZE_KEYS, SKILL_KEYS } from '#/lib/rules'

import { entityRefOf } from './kind'

export const ABILITY_TIMINGS = ['action', 'bonus action', 'reaction', 'trait'] as const

export type AbilityTiming = (typeof ABILITY_TIMINGS)[number]

const SPEED_MODES = ['walk', 'climb', 'fly', 'swim', 'burrow'] as const
export const CHALLENGE_RATINGS = [
  '0',
  '1/8',
  '1/4',
  '1/2',
  ...Array.from({ length: 30 }, (_, index) => String(index + 1)),
] as [string, ...string[]]
export type ChallengeRating = (typeof CHALLENGE_RATINGS)[number]

const AbilityId = z.enum(ABILITY_KEYS)
const SpeedMode = z.enum(SPEED_MODES)
/** A rules term from the glossary, e.g. `refs.rules.fire` or `refs.rules.prone`. */
const RuleRef = entityRefOf('rule')
const Proficiency = z
  .enum(['proficient', 'expert'])
  .describe('Expert doubles the proficiency bonus')

/**
 * Ability rules text as tokens: plain strings, and typed references the tracker answers in place
 * from this stat block — speeds, sibling abilities by key, numbers — and rules terms such as
 * `refs.rules.prone`, which the UI explains in place.
 */
export const AbilityTextToken = z.union([
  z.string().min(1),
  z.strictObject({ speed: SpeedMode, times: z.number().positive().optional() }),
  z.strictObject({ ability: z.string().min(1).describe('Key of another ability in this block') }),
  z.strictObject({
    dc: AbilityId.describe('Save DC: 8 + proficiency + this modifier'),
    save: AbilityId.optional().describe(
      'The ability the target saves with, when it is not the one the DC is built from',
    ),
  }),
  z.strictObject({ mod: AbilityId }),
  z.strictObject({ pb: z.literal(true) }),
  RuleRef,
])

export type AbilityTextToken = z.infer<typeof AbilityTextToken>

/** One damage roll, e.g. `1d10` piercing plus the attacking ability modifier. */
const Damage = z.strictObject({
  dice: z
    .string()
    .regex(/^(\d+d(4|6|8|10|12|20)|[1-9]\d*)$/, 'Use dice like `2d6`, or a fixed amount like `1`')
    .describe('Dice to roll, or a fixed amount for damage that is never rolled, e.g. `1`'),
  type: RuleRef.describe('A damage type, e.g. `refs.rules.piercing`'),
  addModifier: z
    .boolean()
    .default(false)
    .describe('Add the attack ability modifier, as weapon and natural attacks usually do'),
})

/** A magic weapon's bonus: added to the attack roll and to each damage roll that adds the modifier. */
const MagicBonus = z
  .number()
  .int()
  .min(1)
  .max(3)
  .optional()
  .describe('A +1, +2 or +3 weapon: added to the attack roll and to damage that adds the modifier')

/** An attack roll. The to-hit bonus and damage averages are derived from the scores and CR. */
const Attack = z.discriminatedUnion('kind', [
  z.strictObject({
    kind: z.literal('melee'),
    ability: AbilityId,
    reach: z
      .number()
      .int()
      .nonnegative()
      .default(5)
      .describe('Feet; 0 when it only reaches creatures in its own space, like a swarm'),
    thrown: z
      .tuple([z.number().int().positive(), z.number().int().positive()])
      .optional()
      .describe('Feet: a melee attack that can also be thrown, like a javelin, at this range'),
    magic: MagicBonus,
    damage: z.array(Damage).min(1),
  }),
  z.strictObject({
    kind: z.literal('ranged'),
    ability: AbilityId,
    range: z.tuple([z.number().int().positive(), z.number().int().positive()]).describe('Feet'),
    magic: MagicBonus,
    damage: z.array(Damage).min(1),
  }),
])

export type Attack = z.infer<typeof Attack>

/** Area shapes from the rules glossary. */
const AREA_SHAPES = ['cone', 'cube', 'line', 'sphere', 'emanation'] as const

const Feet = z.number().int().positive().describe('Feet')

/**
 * Who a save ability catches: an area (`refs.rules.cone`, `sphere`, …) or a number of creatures in
 * range. Sizes follow the rules: a cone's length, a cube's side, a sphere's radius, an
 * emanation's distance from the creature, a line's length plus `width`.
 */
const SaveTarget = z.union([
  z.strictObject({
    area: z.strictObject({
      shape: RuleRef.describe(
        'An area shape: `refs.rules.cone`, `cube`, `line`, `sphere`, `emanation`',
      ),
      size: Feet,
      width: Feet.optional().describe('Lines only'),
    }),
    range: Feet.optional().describe(
      'How far away it can be placed; omit when it starts at the creature',
    ),
    chosen: z
      .boolean()
      .optional()
      .describe('Only creatures of its choice in the area are affected'),
  }),
  z.strictObject({
    creatures: z.number().int().positive().describe('How many creatures it picks'),
    range: Feet,
    which: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe(
        'Who qualifies, read after the count, e.g. `it can see`, `that is Large or smaller`',
      ),
  }),
])

/** Damage on a failed save. `addModifier` adds the modifier of the DC's ability. */
const SaveDamage = Damage.extend({
  type: RuleRef.optional().describe('A damage type; omit when it varies and say how in `also`'),
})

/**
 * A saving throw the ability forces. Every number is derived: the DC from `dc`, damage averages
 * from the dice. Text tokens are only for riders the structure can't say.
 */
const Save = z.strictObject({
  ability: AbilityId.describe('What the targets save with'),
  dc: AbilityId.describe('The creature ability the DC is built from: 8 + proficiency + modifier'),
  target: SaveTarget,
  onFail: z.strictObject({
    damage: z.array(SaveDamage).min(1).optional(),
    conditions: z.array(RuleRef).min(1).optional().describe('Conditions, e.g. `refs.rules.prone`'),
    also: z
      .array(AbilityTextToken)
      .min(1)
      .optional()
      .describe('Full sentences for what else happens on a failure, e.g. how long it lasts'),
  }),
  onSuccess: z
    .enum(['half', 'none'])
    .default('none')
    .describe('`half`: half the damage and none of the conditions. `none`: nothing happens'),
})

export type Save = z.infer<typeof Save>

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
  save: Save.optional(),
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
  pool: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Points spent a few at a time instead of whole uses, e.g. Lay on Hands’ 25'),
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

/** What every stat block has, a creature's or a PC's. */
const statCore = {
  size: z.enum(SIZE_KEYS),
  swarmOf: z
    .enum(SIZE_KEYS)
    .optional()
    .describe('A swarm: the size of each creature in it. `size` is the whole swarm’s'),
  type: z.enum(CREATURE_TYPE_KEYS),
  ac: z.number().int().nonnegative(),
  armor: z.string().optional().describe('What gives the AC, e.g. `chain mail, shield`'),
  speed: z
    .partialRecord(SpeedMode, z.number().nonnegative())
    .refine((speed) => speed.walk !== undefined, 'Every creature needs a walk speed (0 if none)')
    .describe('Feet'),
  scores: z.record(AbilityId, Score).describe('Every ability, Strength to Charisma'),
  saves: z.partialRecord(AbilityId, Proficiency).optional(),
  skills: z.partialRecord(z.enum(SKILL_KEYS), Proficiency).optional(),
  senses: z
    .partialRecord(z.enum(SENSE_KEYS), z.number().int().positive())
    .optional()
    .describe('Feet'),
  damageVulnerabilities: z.array(RuleRef).optional().describe('Damage types'),
  damageResistances: z.array(RuleRef).optional().describe('Damage types'),
  damageImmunities: z.array(RuleRef).optional().describe('Damage types'),
  conditionImmunities: z.array(RuleRef).optional().describe('Conditions'),
  abilities: z.array(Ability.extend({ timing: z.enum(ABILITY_TIMINGS) })).default([]),
}

type AbilityBlock = {
  speed: Partial<Record<z.infer<typeof SpeedMode>, number>>
  abilities: readonly Ability[]
  legendary?: { actions: readonly Ability[] }
  lairActions?: readonly Ability[]
}

/** Ability keys are unique, saves are complete, and text only points at what the block has. */
function checkAbilities(block: AbilityBlock, context: z.RefinementCtx) {
  const all = [
    ...block.abilities,
    ...(block.legendary?.actions ?? []),
    ...(block.lairActions ?? []),
  ]
  const keys = new Set<string>()
  for (const ability of all) {
    if (keys.has(ability.key))
      context.addIssue({ code: 'custom', message: `Duplicate ability key: ${ability.key}` })
    keys.add(ability.key)
  }
  for (const ability of all) {
    const save = ability.save
    if (save && 'area' in save.target) {
      const { shape, width } = save.target.area
      if (!(AREA_SHAPES as readonly string[]).includes(shape.key))
        context.addIssue({
          code: 'custom',
          message: `${ability.name}: area shape must be one of ${AREA_SHAPES.join(', ')}`,
        })
      if ((shape.key === 'line') !== (width !== undefined))
        context.addIssue({
          code: 'custom',
          message: `${ability.name}: a line needs a width, and only a line has one`,
        })
    }
    if (save && !save.onFail.damage && !save.onFail.conditions && !save.onFail.also)
      context.addIssue({
        code: 'custom',
        message: `${ability.name}: say what a failed save does`,
      })
    if (save?.onSuccess === 'half' && !save.onFail.damage)
      context.addIssue({
        code: 'custom',
        message: `${ability.name}: half on a success needs damage on a failure`,
      })
    for (const token of [...ability.text, ...(save?.onFail.also ?? [])]) {
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
}

const creatureShape = {
  ...statCore,
  cr: z.enum(CHALLENGE_RATINGS),
  hitDice: z.string().regex(/^\d+d(4|6|8|10|12|20)$/, 'Use hit dice like `3d10`'),
  legendary: z
    .strictObject({
      uses: z.number().int().positive().describe('Shared pool, refilled at the start of its turn'),
      actions: z.array(Ability).min(1),
    })
    .optional(),
  lairActions: z
    .array(Ability)
    .min(1)
    .optional()
    .describe(
      'In its lair, one of these on initiative 20 each round; not the same one twice in a row',
    ),
}

/**
 * DM-only 5e statistics for an NPC, beast, or shared creature. Only base facts are stored:
 * proficiency bonus, hit points, save and skill bonuses, passive Perception, to-hit bonuses,
 * damage averages and save DCs are derived in `src/lib/stat-block.ts`.
 */
export const StatBlock = z
  .strictObject({ ...creatureShape, source: Source })
  .superRefine(checkAbilities)

/**
 * A creature's statistics exactly as one publication prints them, for the library. The printing
 * that holds it owns where it comes from, so it has no `source`. Derived numbers follow the same
 * rules as `StatBlock`, so the library and the encounter tracker read it the same way.
 */
export const PrintedStatBlock = z.strictObject(creatureShape).superRefine(checkAbilities)

export type PrintedStatBlock = z.infer<typeof PrintedStatBlock>

/** How a PC's limited abilities say which rest refills them. */
export const REST_RECHARGE = /^(Short rest|Long rest(; one comes back on a short rest)?)$/

/**
 * DM-only statistics for a PC, copied from the player's character sheet: every attack, spell,
 * feature and trait written out as an ability, so the encounter runs a PC like any creature. The
 * PC's level sets the proficiency bonus; bonuses, DCs and passive Perception are derived.
 */
export const PcStatBlock = z
  .strictObject({
    ...statCore,
    maxHp: z.number().int().positive().describe('Hit point maximum from the character sheet'),
    hitDice: z
      .array(z.string().regex(/^\d+d(6|8|10|12)$/, 'Use hit dice like `5d10`'))
      .min(1)
      .optional()
      .describe("Hit Point Dice, one entry per die size: `['3d8', '2d6']` for a multiclass"),
    spellSlots: z
      .array(z.number().int().nonnegative())
      .min(1)
      .max(9)
      .optional()
      .describe('Spell slots by level, 1st first: `[4, 2]` is four 1st-level and two 2nd-level'),
    pactSlots: z
      .strictObject({
        level: z.number().int().min(1).max(5),
        count: z.number().int().positive(),
      })
      .optional()
      .describe('Pact Magic slots, all of one level, back on a short rest'),
  })
  .superRefine(checkAbilities)
  .superRefine((block, context) => {
    // A player's rests refill these, so the sheet must say which rest brings each one back.
    for (const ability of block.abilities) {
      if ((ability.uses || ability.pool) && !REST_RECHARGE.test(ability.recharge ?? ''))
        context.addIssue({
          code: 'custom',
          message: `${ability.name}: a PC's limited ability recharges on \`Short rest\`, \`Long rest\`, or \`Long rest; one comes back on a short rest\``,
        })
    }
  })

export type PcStatBlock = z.infer<typeof PcStatBlock>

export type StatBlock = z.infer<typeof StatBlock>

/**
 * An NPC's or beast's statistics: its own stat block, or a reference to the shared creature it is
 * one of (`refs.creatures.*`), so several records never carry copies of the same numbers.
 */
export const OwnOrSharedStatBlock = z.union([StatBlock, entityRefOf('creature')])

export type OwnOrSharedStatBlock = z.infer<typeof OwnOrSharedStatBlock>
