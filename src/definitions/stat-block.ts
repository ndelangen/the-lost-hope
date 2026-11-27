import { z } from 'zod'

import {
  ABILITY_KEYS,
  CONDITION_KEYS,
  CREATURE_TYPE_KEYS,
  SENSE_KEYS,
  SIZE_KEYS,
  SKILL_KEYS,
} from '#/lib/rules'

import { entityRefOf } from './kind'
import { EffectKey, stagedEffectProblems, statusEffectSchemas } from './status-effect'

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
    printed: z
      .number()
      .int()
      .optional()
      .describe('The DC as the book prints it, kept only where it breaks the formula'),
  }),
  z.strictObject({ mod: AbilityId }),
  z
    .strictObject({
      roll: z
        .string()
        .regex(/^\d+d(4|6|8|10|12|20)$/)
        .describe('Dice, e.g. `1d12`; shown with its average: "6 (1d12)"'),
      mod: AbilityId.optional().describe('Adds this ability modifier, e.g. "12 (2d6 + 5)"'),
      bonus: z
        .number()
        .int()
        .optional()
        .describe('A flat bonus the book prints that no ability modifier explains, e.g. "+ 2"'),
      printed: z
        .number()
        .int()
        .optional()
        .describe('The average as the book prints it, kept only where it breaks the formula'),
    })
    .describe('A roll in the rules text, e.g. damage every 10 minutes or hit points regained'),
  z.strictObject({
    toHit: AbilityId.describe(
      'Attack bonus with this ability: modifier + proficiency, e.g. spell attacks',
    ),
    printed: z
      .number()
      .int()
      .optional()
      .describe('The bonus as the book prints it, kept only where it breaks the formula'),
  }),
  z.strictObject({ pb: z.literal(true) }),
  RuleRef,
  entityRefOf('spell').describe('A spell from the library, e.g. `refs.spells.fireball`'),
  z.strictObject({
    effect: EffectKey.describe('An effect of this ability by key; shown with what it does'),
  }),
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
  printedBonus: z
    .number()
    .int()
    .optional()
    .describe(
      'The flat bonus to this roll as the book prints it, kept only where it breaks the formula (a rage, an unstated magic weapon)',
    ),
  printedAverage: z
    .number()
    .int()
    .optional()
    .describe('The average as the book prints it, kept only where it breaks the formula'),
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
    twoHanded: z
      .array(Damage)
      .min(1)
      .optional()
      .describe('A versatile weapon: the damage instead of `damage` when wielded with two hands'),
    printedBonus: z
      .number()
      .int()
      .optional()
      .describe('The to-hit bonus as the book prints it, kept only where it breaks the formula'),
    magic: MagicBonus,
    damage: z.array(Damage).min(1),
  }),
  z.strictObject({
    kind: z.literal('ranged'),
    ability: AbilityId,
    range: z.tuple([z.number().int().positive(), z.number().int().positive()]).describe('Feet'),
    printedBonus: z
      .number()
      .int()
      .optional()
      .describe('The to-hit bonus as the book prints it, kept only where it breaks the formula'),
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
  printedDc: z
    .number()
    .int()
    .optional()
    .describe('The save DC as the book prints it, kept only where it breaks the formula'),
  onSuccess: z
    .enum(['half', 'none'])
    .default('none')
    .describe('`half`: half the damage and none of the conditions. `none`: nothing happens'),
})

export type Save = z.infer<typeof Save>

/** A DC from this creature's numbers: 8 + proficiency + the modifier, or as the book prints it. */
const CreatureDc = z.strictObject({
  dc: AbilityId.describe('The creature ability the DC is built from'),
  printed: z
    .number()
    .int()
    .optional()
    .describe('The DC as the book prints it, kept only where it breaks the formula'),
})

const effectSchemas = statusEffectSchemas(AbilityTextToken, CreatureDc)

/**
 * What an ability leaves on whoever it hits or catches, as a sub-entity of the ability. See
 * `./status-effect`. Its numbers (save DC, escape DC) come from this stat block.
 */
export const AbilityEffect = z.strictObject({
  ...effectSchemas.shape,
  lands: z
    .discriminatedUnion('on', [
      z.strictObject({ on: z.literal('hit') }).describe('When the attack hits'),
      z
        .strictObject({ on: z.literal('failed-save') })
        .describe('When the target fails the ability’s own `save`'),
      z
        .strictObject({ on: z.literal('save'), save: AbilityId, ...CreatureDc.shape })
        .describe('When the target fails a save the ability’s text calls for'),
      z.strictObject({ on: z.literal('use') }).describe('No roll: it simply lands'),
    ])
    .describe('How it lands on someone'),
})

export type AbilityEffect = z.infer<typeof AbilityEffect>

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
  effects: z
    .array(AbilityEffect)
    .optional()
    .describe(
      'What it leaves on whoever it hits or catches, for the tracker to apply. `[]`: checked, it leaves nothing lasting (damage, a push); left out: not checked yet',
    ),
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
  cost: z
    .number()
    .int()
    .min(2)
    .optional()
    .describe('Legendary actions only: uses it spends from the shared pool, when more than one'),
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

/** An ability as a stat block lists it, with when it is used. */
export const CreatureAbility = Ability.extend({ timing: z.enum(ABILITY_TIMINGS) })

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
  initiative: Proficiency.optional().describe(
    'Proficiency added to initiative, as 2024 stat blocks print it (e.g. a dragon’s +11)',
  ),
  senses: z
    .partialRecord(z.enum(SENSE_KEYS), z.number().int().positive())
    .optional()
    .describe('Feet'),
  damageVulnerabilities: z.array(RuleRef).optional().describe('Damage types'),
  damageResistances: z.array(RuleRef).optional().describe('Damage types'),
  damageImmunities: z.array(RuleRef).optional().describe('Damage types'),
  nonmagicalResistances: z
    .array(RuleRef)
    .optional()
    .describe('Damage types resisted only from nonmagical attacks (2014 rules)'),
  nonmagicalImmunities: z
    .array(RuleRef)
    .optional()
    .describe('Damage types it is immune to only from nonmagical attacks (2014 rules)'),
  nonmagicalExcept: z
    .enum(['silvered', 'adamantine'])
    .optional()
    .describe('Weapons that get through those nonmagical defences anyway'),
  conditionImmunities: z.array(RuleRef).optional().describe('Conditions'),
  abilities: z.array(CreatureAbility).default([]),
}

type AbilityBlock = {
  speed: Partial<Record<z.infer<typeof SpeedMode>, number>>
  abilities: readonly Ability[]
  options?: readonly {
    key: string
    form?: boolean
    replaces?: readonly string[]
    abilities: readonly Ability[]
  }[]
  legendary?: { actions: readonly Ability[] }
  lairActions?: readonly Ability[]
}

/** Ability keys are unique, saves are complete, and text only points at what the block has. */
function checkAbilities(block: AbilityBlock, context: z.RefinementCtx) {
  const all = [
    ...block.abilities,
    ...(block.legendary?.actions ?? []),
    ...(block.lairActions ?? []),
    // An option's abilities join the block when the DM picks it, so they are checked with it.
    ...(block.options ?? []).flatMap((option) => option.abilities),
  ]
  const keys = new Set<string>()
  // Effects are keyed across the whole stat block, so a ref names one by creature and key.
  const effectKeys = new Set<string>()
  // What each ability's text may point at: the printed block, plus its own option when it has one.
  const base = all.slice(0, all.length - (block.options ?? []).flatMap((o) => o.abilities).length)
  const keysOf = (abilities: readonly Ability[]) => ({
    abilities: new Set(abilities.map(({ key }) => key)),
    effects: new Set(
      abilities.flatMap(({ effects }) =>
        (effects ?? []).flatMap((effect) => [
          effect.key,
          ...(effect.becomes ? [effect.becomes.key] : []),
        ]),
      ),
    ),
  })
  const scope = new Map<Ability, ReturnType<typeof keysOf>>()
  for (const ability of base) scope.set(ability, keysOf(base))
  const optionKeys = new Set<string>()
  for (const option of block.options ?? []) {
    if (optionKeys.has(option.key))
      context.addIssue({ code: 'custom', message: `Duplicate option key: ${option.key}` })
    optionKeys.add(option.key)
    const visible = keysOf([
      ...base.filter(({ key }) => !option.replaces?.includes(key)),
      ...option.abilities,
    ])
    for (const ability of option.abilities) scope.set(ability, visible)
  }
  // A later stage is an effect of its own, so the text and the tracker can point at it.
  const effectsOf = (abilities: readonly Ability[]) =>
    abilities.flatMap((ability) =>
      (ability.effects ?? []).flatMap((effect) => [
        effect,
        ...(effect.becomes ? [effect.becomes] : []),
      ]),
    )
  for (const effect of effectsOf(base)) {
    if (effectKeys.has(effect.key))
      context.addIssue({ code: 'custom', message: `Duplicate effect key: ${effect.key}` })
    effectKeys.add(effect.key)
  }
  // An option's effects are checked against the block it makes: the printed one without what it replaces.
  for (const option of block.options ?? []) {
    const kept = new Set(
      effectsOf(base.filter(({ key }) => !option.replaces?.includes(key))).map(({ key }) => key),
    )
    for (const effect of effectsOf(option.abilities)) {
      if (kept.has(effect.key))
        context.addIssue({ code: 'custom', message: `Duplicate effect key: ${effect.key}` })
      kept.add(effect.key)
    }
  }
  for (const ability of base) {
    if (keys.has(ability.key))
      context.addIssue({ code: 'custom', message: `Duplicate ability key: ${ability.key}` })
    keys.add(ability.key)
  }
  // An option's ability may reuse the key of a printed ability only when it replaces it, and
  // options the DM can pick together (any but forms, of which one is picked) never share a key.
  const printedKeys = new Set(block.abilities.map(({ key }) => key))
  const together = new Set<string>()
  for (const option of block.options ?? []) {
    if (!option.form)
      for (const { key } of option.abilities) {
        if (together.has(key))
          context.addIssue({ code: 'custom', message: `Two options add ability ${key}` })
        together.add(key)
      }
    for (const key of option.replaces ?? [])
      if (!printedKeys.has(key))
        context.addIssue({
          code: 'custom',
          message: `${option.key} replaces a missing ability: ${key}`,
        })
    const own = new Set<string>()
    for (const ability of option.abilities) {
      if (
        own.has(ability.key) ||
        (keys.has(ability.key) && !option.replaces?.includes(ability.key))
      )
        context.addIssue({ code: 'custom', message: `Duplicate ability key: ${ability.key}` })
      own.add(ability.key)
    }
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
    for (const effect of ability.effects ?? []) {
      if (effect.lands.on === 'failed-save' && !save)
        context.addIssue({
          code: 'custom',
          message: `${ability.name}: effect ${effect.key} lands on a failed save, but it has none`,
        })
      if (effect.lands.on === 'hit' && !ability.attack)
        context.addIssue({
          code: 'custom',
          message: `${ability.name}: effect ${effect.key} lands on a hit, but it has no attack`,
        })
      if (
        effect.ends?.repeatSave &&
        effect.lands.on !== 'failed-save' &&
        effect.lands.on !== 'save'
      )
        context.addIssue({
          code: 'custom',
          message: `${ability.name}: effect ${effect.key} repeats a save it never called for`,
        })
      for (const problem of stagedEffectProblems(effect, CONDITION_KEYS))
        context.addIssue({ code: 'custom', message: `${ability.name}: effect ${problem}` })
    }
    for (const token of [...ability.text, ...(save?.onFail.also ?? [])]) {
      if (typeof token === 'string') continue
      if ('effect' in token && !scope.get(ability)?.effects.has(token.effect))
        context.addIssue({
          code: 'custom',
          message: `${ability.name} refers to a missing effect: ${token.effect}`,
        })
      if ('ability' in token && !scope.get(ability)?.abilities.has(token.ability))
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

/** The book's own numbers where they break the formula; everything else is derived. */
const PrintedNumbers = z
  .strictObject({
    proficiencyBonus: z.number().int().positive().optional(),
    hitPoints: z.number().int().positive().optional(),
    initiative: z.number().int().optional(),
    passivePerception: z.number().int().optional(),
    saves: z.partialRecord(AbilityId, z.number().int()).optional(),
    skills: z.partialRecord(z.enum(SKILL_KEYS), z.number().int()).optional(),
  })
  .refine(
    (printed) => Object.keys(printed).length > 0,
    'Leave out `printed` when nothing breaks the formula',
  )

/**
 * An optional rule the book prints for a creature, such as a demon's Summon Demon action or a
 * slaad's control gem: abilities that join the stat block when the DM picks it.
 */
const CreatureOption = z.strictObject({
  key: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(1).describe('As the book names the variant, e.g. `Summoner`'),
  form: z
    .literal(true)
    .optional()
    .describe('One of the forms it takes, e.g. a spirit summoned as Slaad: pick one of these'),
  speed: z
    .partialRecord(SpeedMode, z.number().nonnegative())
    .optional()
    .describe('Speeds this option adds, e.g. a beholderkin spirit’s fly speed'),
  replaces: z
    .array(z.string().min(1))
    .min(1)
    .optional()
    .describe(
      'Keys of printed abilities this option swaps out, e.g. spellcasting with more spells',
    ),
  size: z.enum(SIZE_KEYS).optional().describe('The size this form takes, e.g. a Huge object'),
  type: z.enum(CREATURE_TYPE_KEYS).optional().describe('The creature type this form takes'),
  damageResistances: z.array(RuleRef).optional().describe('Damage types this form also resists'),
  damageImmunities: z
    .array(RuleRef)
    .optional()
    .describe('Damage types this form is also immune to'),
  damageVulnerabilities: z
    .array(RuleRef)
    .optional()
    .describe('Damage types this form is also vulnerable to'),
  conditionImmunities: z
    .array(RuleRef)
    .optional()
    .describe('Conditions this form is also immune to'),
  abilities: z.array(Ability.extend({ timing: z.enum(ABILITY_TIMINGS) })).default([]),
})

const creatureShape = {
  ...statCore,
  options: z
    .array(CreatureOption)
    .min(1)
    .optional()
    .describe('Optional abilities the book prints for this creature; the DM picks them'),
  cr: z
    .enum(CHALLENGE_RATINGS)
    .optional()
    .describe(
      'Left out only for a creature that follows its owner (src/data/library/owned/): the book gives it none',
    ),
  hitDice: z
    .string()
    .regex(/^\d+d(4|6|8|10|12|20)$/, 'Use hit dice like `3d10`')
    .optional()
    .describe('Left out when the book gives hit points alone, as for a summoned spirit'),
  printed: PrintedNumbers.optional().describe(
    'Numbers the book prints that its own statistics do not produce: the book wins',
  ),
  legendary: z
    .strictObject({
      uses: z.number().int().positive().describe('Shared pool, refilled at the start of its turn'),
      lairUses: z.number().int().positive().optional().describe('The pool while in its lair'),
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

/** Hit points come from hit dice, or the book prints them alone. */
function checkHitPoints(
  block: { hitDice?: string; printed?: { hitPoints?: number } },
  context: z.RefinementCtx,
) {
  if (!block.hitDice && block.printed?.hitPoints === undefined)
    context.addIssue({
      code: 'custom',
      message: 'Give `hitDice`, or `printed.hitPoints` when the book has none',
    })
}

/**
 * DM-only 5e statistics for an NPC, beast, or shared creature. Only base facts are stored:
 * proficiency bonus, hit points, save and skill bonuses, passive Perception, to-hit bonuses,
 * damage averages and save DCs are derived in `src/lib/stat-block.ts`.
 * A campaign creature always has a challenge rating and hit dice: only a library creature that
 * follows its owner goes without.
 */
export const StatBlock = z
  .strictObject({
    ...creatureShape,
    cr: z.enum(CHALLENGE_RATINGS),
    hitDice: z.string().regex(/^\d+d(4|6|8|10|12|20)$/, 'Use hit dice like `3d10`'),
    source: Source,
  })
  .superRefine(checkAbilities)

/**
 * A creature's statistics exactly as one publication prints them, for the library. The printing
 * that holds it owns where it comes from, so it has no `source`. Derived numbers follow the same
 * rules as `StatBlock`, so the library and the encounter tracker read it the same way.
 */
export const PrintedStatBlock = z
  .strictObject(creatureShape)
  .superRefine(checkAbilities)
  .superRefine(checkHitPoints)

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
