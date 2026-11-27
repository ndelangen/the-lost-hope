import {
  type Ability,
  type Attack,
  type ChallengeRating,
  type PcStatBlock,
  type PrintedStatBlock,
  type Save,
  type ScaledNumber,
  type Scaling,
  type StatBlock,
} from '#/definitions/stat-block'
import { stageOf } from '#/definitions/status-effect'

import type { AreaSize } from './area-grid'
import type { DerivedStatBlock } from './dm-ability-text'
import {
  ABILITY_KEYS,
  SENSE_KEYS,
  SKILL_KEYS,
  ruleOf,
  ruleRef,
  rules,
  skillAbility,
  type AbilityId,
  type RuleRef,
  type Sense,
  type Skill,
} from './rules'

/**
 * Everything a stat block implies but does not store. Stat blocks keep base facts only (scores,
 * CR, hit dice, proficiencies, attack dice); every bonus and average a DM reads is derived here,
 * so changing a score updates every number that depends on it.
 */

/** Ability modifier for a score. */
export function modifier(score: number) {
  return Math.floor((score - 10) / 2)
}

export function signed(value: number) {
  return value >= 0 ? `+${value}` : `−${Math.abs(value)}`
}

function crValue(cr: ChallengeRating) {
  const [top, bottom] = cr.split('/').map(Number)
  return bottom ? top! / bottom : top!
}

/** Proficiency bonus by challenge rating (SRD 5.2.1). */
export function proficiencyBonus(cr: ChallengeRating) {
  return Math.max(2, Math.ceil(crValue(cr) / 4) + 1)
}

/**
 * A PC's stat block with the character level that sets its proficiency bonus. PCs have no
 * legendary or lair actions; the `never` fields let code read those of any stat block.
 */
export type PlayablePcStats = PcStatBlock & {
  level: number
  legendary?: never
  lairActions?: never
}

/** A creature's stat block or a PC's: everything the encounter can run. */
export type AnyStatBlock = StatBlock | PrintedStatBlock | PlayablePcStats

/** Proficiency bonus from a creature's challenge rating or a PC's level. */
export function proficiencyOf(stats: AnyStatBlock) {
  if (!('cr' in stats)) return Math.ceil(stats.level / 4) + 1
  // A summoned creature or companion uses its owner's.
  return (
    ('printed' in stats ? stats.printed?.proficiencyBonus : undefined) ?? proficiencyBonus(stats.cr)
  )
}

/** What a level-scaled creature's numbers come from: its level and its owner's numbers. */
export type ScaleInputs = {
  level: number
  proficiencyBonus: number
  spellAttack: number
  spellSaveDc: number
  modifiers: Record<AbilityId, number>
}

/** A scaled number at these inputs; fractions of a level round down. */
export function scaledValue(value: ScaledNumber, inputs: ScaleInputs) {
  const levels = Math.max(0, inputs.level - (value.above ?? 0))
  return (
    (value.base ?? 0) +
    Math.floor((value.level ?? 0) * levels) +
    (value.owner ? inputs.modifiers[value.owner] : 0) +
    (value.pb ?? 0) * inputs.proficiencyBonus +
    (value.steps ?? []).reduce((sum, step) => sum + (inputs.level >= step.from ? step.add : 0), 0)
  )
}

/** The owner's ability a level-scaled creature adds, e.g. an artificer's Intelligence. */
export function scaledOwnerAbility(stats: PrintedStatBlock | StatBlock): AbilityId | undefined {
  const scaling = stats.scaling
  if (!scaling) return undefined
  return [scaling.ac, scaling.hitPoints, scaling.damageBonus].find((value) => value?.owner)?.owner
}

/**
 * Typical owner's numbers for a level: a caster who can cast the spell at that slot (or a
 * character of that class level) with a +3 in the ability that matters, for the library to show
 * a level-scaled creature before anyone owns it.
 */
export function typicalInputs(scaling: Scaling, level: number): ScaleInputs {
  const characterLevel = scaling.by === 'spell' ? Math.min(20, level * 2 - 1) : level
  const pb = Math.ceil(characterLevel / 4) + 1
  const modifiers = { str: 3, dex: 3, con: 3, int: 3, wis: 3, cha: 3 }
  return { level, proficiencyBonus: pb, spellAttack: pb + 3, spellSaveDc: 8 + pb + 3, modifiers }
}

/**
 * A level-scaled creature at one level, as an ordinary stat block: its armor class, hit points,
 * attack and damage bonuses and save DCs worked out from the level and its owner's numbers, kept
 * as the numbers it prints at that level.
 */
export function scaleCreature<T extends PrintedStatBlock | StatBlock>(
  stats: T,
  inputs: ScaleInputs,
): T {
  const scaling = stats.scaling
  if (!scaling) return stats
  const hitPoints = scaledValue(scaling.hitPoints, inputs)
  const damage = scaling.damageBonus && scaledValue(scaling.damageBonus, inputs)
  const scaleAbility = <A extends Ability>(ability: A): A => ({
    ...ability,
    ...(ability.attack
      ? {
          attack: {
            ...ability.attack,
            ...(scaling.attackBonus ? { printedBonus: inputs.spellAttack } : {}),
            damage: ability.attack.damage.map((roll) =>
              roll.addModifier && damage !== undefined ? { ...roll, printedBonus: damage } : roll,
            ),
          },
        }
      : {}),
    ...(ability.save && scaling.saveDc
      ? { save: { ...ability.save, printedDc: inputs.spellSaveDc } }
      : {}),
    text: [
      ...ability.text.map((token) =>
        typeof token === 'object' && 'dc' in token && scaling.saveDc
          ? { ...token, printed: inputs.spellSaveDc }
          : token,
      ),
      // How many that is at this level, beside the book's own rule.
      ...(ability.key === 'multiattack' && scaling.attacks
        ? [` At this level: ${scaledValue(scaling.attacks, inputs)} attacks.`]
        : []),
    ],
  })
  return {
    ...stats,
    ac: scaling.ac ? scaledValue(scaling.ac, inputs) : stats.ac,
    hitDice: scaling.hitDie ? `${inputs.level}${scaling.hitDie}` : stats.hitDice,
    printed: { ...stats.printed, proficiencyBonus: inputs.proficiencyBonus, hitPoints },
    abilities: stats.abilities.map(scaleAbility),
    ...(stats.options
      ? {
          options: stats.options.map((option) => ({
            ...option,
            abilities: option.abilities.map(scaleAbility),
          })),
        }
      : {}),
  }
}

const XP: Record<string, number> = {
  '0': 10,
  '1/8': 25,
  '1/4': 50,
  '1/2': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000,
}

/** Experience points for defeating a creature of this challenge rating. */
function experience(cr: ChallengeRating) {
  return XP[cr] ?? 0
}

function dice(notation: string) {
  const [count, faces] = notation.split('d').map(Number)
  return { count: count!, faces: faces! }
}

/** Average of a dice expression plus a flat bonus, rounded down, as stat blocks print it. */
function average(notation: string, bonus = 0) {
  if (!notation.includes('d')) return Number(notation) + bonus
  const { count, faces } = dice(notation)
  return Math.floor((count * (faces + 1)) / 2) + bonus
}

/** "22 (3d10 + 6)" */
function rollText(notation: string, bonus: number) {
  const flat = bonus === 0 ? '' : ` ${bonus > 0 ? '+' : '−'} ${Math.abs(bonus)}`
  return `${average(notation, bonus)} (${notation}${flat})`
}

/** The stat block with the abilities of the options the DM picked joined in. */
export function withOptions<T extends PrintedStatBlock | StatBlock>(
  stats: T,
  picked: readonly string[],
): T {
  const chosen = (stats.options ?? []).filter(({ key }) => picked.includes(key))
  if (!chosen.length) return stats
  // A form can set its own size, and the armor class and hit points it scales to.
  const form = chosen.find((option) => option.form)
  return {
    ...stats,
    ...(form?.size ? { size: form.size } : {}),
    ...(form?.type ? { type: form.type } : {}),
    // Defences a picked option adds to the printed ones.
    ...Object.fromEntries(
      (
        [
          'damageResistances',
          'damageImmunities',
          'damageVulnerabilities',
          'conditionImmunities',
        ] as const
      ).flatMap((field) => {
        const added = chosen.flatMap((option) => option[field] ?? [])
        return added.length ? [[field, [...(stats[field] ?? []), ...added]]] : []
      }),
    ),
    ...(stats.scaling && (form?.ac || form?.hitPoints)
      ? {
          scaling: {
            ...stats.scaling,
            ac: form.ac ?? stats.scaling.ac,
            hitPoints: form.hitPoints ?? stats.scaling.hitPoints,
          },
        }
      : {}),
    speed: Object.assign({}, stats.speed, ...chosen.map(({ speed }) => speed ?? {})),
    // An option can swap a printed ability for its own, e.g. spellcasting with more spells.
    abilities: [
      ...stats.abilities.filter(
        ({ key }) => !chosen.some((option) => option.replaces?.includes(key)),
      ),
      ...chosen.flatMap(({ abilities }) => abilities),
    ],
  }
}

/** Every ability in the block, including legendary and lair actions. */
export function allAbilities(stats: AnyStatBlock): readonly Ability[] {
  if (!('cr' in stats)) return stats.abilities
  return [...stats.abilities, ...(stats.legendary?.actions ?? []), ...(stats.lairActions ?? [])]
}

function proficiencyMultiplier(level: 'proficient' | 'expert' | undefined) {
  return level === 'expert' ? 2 : level === 'proficient' ? 1 : 0
}

/**
 * Derived numbers as typed parts, so the screen can explain rules words and give damage types
 * their icon and colour. Plain strings are only for tooltips and tests (`plainStatParts`).
 */
export type StatPart =
  | { kind: 'text'; text: string }
  /** `area` gives an area-of-effect term its size, so its explanation can draw it on the grid. */
  | { kind: 'term'; rule: RuleRef; label: string; area?: AreaSize }
  /** `note` explains a number the book prints differently from the formula. */
  | { kind: 'value'; text: string; note?: string }
  /** "8 (1d10 + 3) piercing": the average to deal, the dice to roll instead, and the type. */
  | { kind: 'damage'; amount: number; roll: string; type?: RuleRef }

type DerivedDamage = Extract<StatPart, { kind: 'damage' }>

type DerivedAttack = {
  /** Added to the d20 for the attack roll: as printed, where the book breaks the formula. */
  bonus: number
  /** What the formula gives, when the printed bonus differs. */
  formula?: number
  damage: DerivedDamage[]
  /** A versatile weapon's damage with two hands. */
  twoHanded?: DerivedDamage[]
}

function flatBonus(bonus: number) {
  return bonus === 0 ? '' : ` ${bonus > 0 ? '+' : '−'} ${Math.abs(bonus)}`
}

export function deriveAttack(attack: Attack, stats: AnyStatBlock): DerivedAttack {
  const mod = modifier(stats.scores[attack.ability])
  const magic = attack.magic ?? 0
  const derive = (rolls: Attack['damage']): DerivedDamage[] =>
    rolls.map((roll) => {
      const extra = roll.printedBonus ?? (roll.addModifier ? mod + magic : 0)
      return {
        kind: 'damage',
        amount: roll.printedAverage ?? average(roll.dice, extra),
        roll: `${roll.dice}${flatBonus(extra)}`,
        type: roll.type,
      }
    })
  const formula = mod + proficiencyOf(stats) + magic
  const printed = attack.printedBonus
  return {
    bonus: printed ?? formula,
    ...(printed !== undefined && printed !== formula ? { formula } : {}),
    damage: derive(attack.damage),
    ...(attack.kind === 'melee' && attack.twoHanded ? { twoHanded: derive(attack.twoHanded) } : {}),
  }
}

/** The damage type as it reads in a sentence: "piercing". */
export function damageLabel(type: RuleRef) {
  return ruleOf(type).name.toLowerCase()
}

const SHORT = {
  str: 'Str',
  dex: 'Dex',
  con: 'Con',
  int: 'Int',
  wis: 'Wis',
  cha: 'Cha',
} as const

/** Damage a failed save deals, with averages; `addModifier` uses the DC's ability. */
export function deriveSaveDamage(save: Save, stats: AnyStatBlock): DerivedDamage[] {
  const mod = modifier(stats.scores[save.dc])
  return (save.onFail.damage ?? []).map((roll) => {
    const extra = roll.printedBonus ?? (roll.addModifier ? mod : 0)
    return {
      kind: 'damage',
      amount: roll.printedAverage ?? average(roll.dice, extra),
      roll: `${roll.dice}${flatBonus(extra)}`,
      type: roll.type,
    }
  })
}

/** "+5, 8 (1d10 + 3) piercing" for attacks, or "DC 21 Dex save, 60 (11d10) fire" for saves. */
export function abilitySummary(ability: Ability, stats: AnyStatBlock): StatPart[] | undefined {
  if (ability.attack) {
    const derived = deriveAttack(ability.attack, stats)
    return [
      {
        kind: 'value',
        text: signed(derived.bonus),
        ...(derived.formula !== undefined
          ? { note: `As printed; the formula gives ${signed(derived.formula)}` }
          : {}),
      },
      { kind: 'text', text: ', ' },
      ...derived.damage.flatMap((damage, index): StatPart[] =>
        index === 0 ? [damage] : [{ kind: 'text', text: ' plus ' }, damage],
      ),
      ...(derived.twoHanded
        ? [
            { kind: 'text', text: ', or ' } as const,
            ...derived.twoHanded.flatMap((damage, index): StatPart[] =>
              index === 0 ? [damage] : [{ kind: 'text', text: ' plus ' }, damage],
            ),
            { kind: 'text', text: ' with two hands' } as const,
          ]
        : []),
    ]
  }
  if (ability.save)
    return [
      { kind: 'term', rule: ruleRef('difficulty_class'), label: 'DC' },
      {
        kind: 'value',
        text: ` ${ability.save.printedDc ?? saveDc(stats, ability.save.dc)} ${SHORT[ability.save.ability]} `,
        ...(ability.save.printedDc !== undefined &&
        ability.save.printedDc !== saveDc(stats, ability.save.dc)
          ? { note: `As printed; the formula gives ${saveDc(stats, ability.save.dc)}` }
          : {}),
      },
      { kind: 'term', rule: ruleRef('saving_throw'), label: 'save' },
      ...(ability.save.onFail.damage
        ? [
            { kind: 'text', text: ', ' } as const,
            ...deriveSaveDamage(ability.save, stats).flatMap((damage, index): StatPart[] =>
              index === 0 ? [damage] : [{ kind: 'text', text: ' plus ' }, damage],
            ),
          ]
        : []),
    ]
  return undefined
}

/** Parts as one string, for tooltips and tests. */
export function plainStatParts(parts: readonly StatPart[]) {
  return parts
    .map((part) => {
      switch (part.kind) {
        case 'text':
        case 'value':
          return part.text
        case 'term':
          return part.label
        case 'damage':
          return `${part.amount}${part.roll === String(part.amount) ? '' : ` (${part.roll})`}${part.type ? ` ${damageLabel(part.type)}` : ''}`
      }
    })
    .join('')
}

function saveDc(stats: AnyStatBlock, ability: AbilityId) {
  return 8 + proficiencyOf(stats) + modifier(stats.scores[ability])
}

/** "50 ft., climb 30 ft." */
export function formatSpeed(speed: StatBlock['speed']) {
  return Object.entries(speed)
    .map(([mode, feet]) => (mode === 'walk' ? `${feet} ft.` : `${mode} ${feet} ft.`))
    .join(', ')
}

/** Open5e page for an SRD creature key. */
export function sourceUrl(key: string) {
  return `https://api.open5e.com/v2/creatures/${key}/`
}

/** "dire wolf" from `srd-2024_dire-wolf` */
export function sourceName(key: string) {
  return key.replace(/^srd-2024_/, '').replaceAll('-', ' ')
}

export type DerivedStats = DerivedStatBlock & {
  maxHp: number
  /** "22 (3d10 + 6)" */
  hitPoints: string
  ac: number
  initiative: number
  experience: number
  saves: Record<AbilityId, number>
  skills: { skill: Skill; label: string; bonus: number }[]
  passivePerception: number
  /** Special senses with their range in feet, in glossary order. */
  senses: { sense: Sense; feet: number }[]
}

/** The numbers a stat block implies: HP, bonuses, DCs, and what ability text refers to. */
export function deriveStatBlock(stats: AnyStatBlock): DerivedStats {
  const pb = proficiencyOf(stats)
  const modifiers = Object.fromEntries(
    ABILITY_KEYS.map((id) => [id, modifier(stats.scores[id])]),
  ) as Record<AbilityId, number>
  // The book's own numbers, where they break the formula.
  const printed = 'printed' in stats ? stats.printed : undefined
  const skills = SKILL_KEYS.filter(
    (skill) => stats.skills?.[skill] || printed?.skills?.[skill] !== undefined,
  ).map((skill) => ({
    skill,
    label: rules[skill].name,
    bonus:
      printed?.skills?.[skill] ??
      modifiers[skillAbility(skill)] + pb * proficiencyMultiplier(stats.skills?.[skill]),
  }))
  const passivePerception =
    printed?.passivePerception ??
    10 + modifiers.wis + pb * proficiencyMultiplier(stats.skills?.perception)
  const derivedMaxHp =
    'cr' in stats ? average(stats.hitDice, dice(stats.hitDice).count * modifiers.con) : stats.maxHp
  return {
    speed: stats.speed,
    abilities: Object.fromEntries(
      allAbilities(stats).map((ability) => [
        ability.key,
        {
          key: ability.key,
          name: ability.name,
          summary: abilitySummary(ability, stats),
        },
      ]),
    ),
    effects: Object.fromEntries(
      allAbilities(stats).flatMap((ability) =>
        (ability.effects ?? []).flatMap((effect) => [
          [effect.key, { ability, effect }],
          // A later stage lands the way its first stage did, on the same save.
          ...(effect.becomes
            ? [[effect.becomes.key, { ability, effect: stageOf(effect) }] as const]
            : []),
        ]),
      ),
    ),
    saveDc: Object.fromEntries(ABILITY_KEYS.map((id) => [id, 8 + pb + modifiers[id]])) as Record<
      AbilityId,
      number
    >,
    modifier: modifiers,
    proficiencyBonus: pb,
    maxHp: printed?.hitPoints ?? derivedMaxHp,
    // A printed total the dice don't produce stands alone: its formula would not add up.
    hitPoints:
      'cr' in stats
        ? 'scaling' in stats && stats.scaling && !stats.scaling.hitDie && printed?.hitPoints
          ? // A summoned creature has hit points but no hit dice.
            String(printed.hitPoints)
          : printed?.hitPoints !== undefined && printed.hitPoints !== derivedMaxHp
            ? `${printed.hitPoints} (${stats.hitDice})`
            : rollText(stats.hitDice, dice(stats.hitDice).count * modifiers.con)
        : String(stats.maxHp),
    ac: stats.ac,
    initiative: printed?.initiative ?? modifiers.dex + pb * proficiencyMultiplier(stats.initiative),
    experience: 'cr' in stats ? experience(stats.cr) : 0,
    saves: Object.fromEntries(
      ABILITY_KEYS.map((id) => [
        id,
        printed?.saves?.[id] ?? modifiers[id] + pb * proficiencyMultiplier(stats.saves?.[id]),
      ]),
    ) as Record<AbilityId, number>,
    skills,
    passivePerception,
    senses: SENSE_KEYS.flatMap((sense) => {
      const feet = stats.senses?.[sense]
      return feet === undefined ? [] : [{ sense, feet }]
    }),
  }
}

/** What an ability is at a glance, so a stat block can colour and label it. */
export type AbilityKind = 'melee' | 'ranged' | 'attack' | 'save' | 'healing' | 'other'

/** An attack roll by its kind, then a forced save, then what it is for. */
export function abilityKind(ability: Ability): AbilityKind {
  if (ability.attack) return ability.attack.kind
  if (ability.save) return 'save'
  if (ability.intent === 'damage') return 'attack'
  if (ability.intent === 'healing') return 'healing'
  return 'other'
}
