import {
  type Ability,
  type Attack,
  type ChallengeRating,
  type Save,
  type StatBlock,
} from '#/definitions/stat-block'

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
  const { count, faces } = dice(notation)
  return Math.floor((count * (faces + 1)) / 2) + bonus
}

/** "22 (3d10 + 6)" */
function rollText(notation: string, bonus: number) {
  const flat = bonus === 0 ? '' : ` ${bonus > 0 ? '+' : '−'} ${Math.abs(bonus)}`
  return `${average(notation, bonus)} (${notation}${flat})`
}

/** Every ability in the block, including legendary and lair actions. */
export function allAbilities(stats: StatBlock): readonly Ability[] {
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
  | { kind: 'term'; rule: RuleRef; label: string }
  | { kind: 'value'; text: string }
  /** "8 (1d10 + 3) piercing": the average to deal, the dice to roll instead, and the type. */
  | { kind: 'damage'; amount: number; roll: string; type?: RuleRef }

type DerivedDamage = Extract<StatPart, { kind: 'damage' }>

type DerivedAttack = {
  /** Added to the d20 for the attack roll. */
  bonus: number
  damage: DerivedDamage[]
}

function flatBonus(bonus: number) {
  return bonus === 0 ? '' : ` ${bonus > 0 ? '+' : '−'} ${Math.abs(bonus)}`
}

export function deriveAttack(attack: Attack, stats: StatBlock): DerivedAttack {
  const mod = modifier(stats.scores[attack.ability])
  return {
    bonus: mod + proficiencyBonus(stats.cr),
    damage: attack.damage.map((roll) => {
      const extra = roll.addModifier ? mod : 0
      return {
        kind: 'damage',
        amount: average(roll.dice, extra),
        roll: `${roll.dice}${flatBonus(extra)}`,
        type: roll.type,
      }
    }),
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
export function deriveSaveDamage(save: Save, stats: StatBlock): DerivedDamage[] {
  const mod = modifier(stats.scores[save.dc])
  return (save.onFail.damage ?? []).map((roll) => {
    const extra = roll.addModifier ? mod : 0
    return {
      kind: 'damage',
      amount: average(roll.dice, extra),
      roll: `${roll.dice}${flatBonus(extra)}`,
      type: roll.type,
    }
  })
}

/** "+5, 8 (1d10 + 3) piercing" for attacks, or "DC 21 Dex save, 60 (11d10) fire" for saves. */
export function abilitySummary(ability: Ability, stats: StatBlock): StatPart[] | undefined {
  if (ability.attack) {
    const derived = deriveAttack(ability.attack, stats)
    return [
      { kind: 'value', text: signed(derived.bonus) },
      { kind: 'text', text: ', ' },
      ...derived.damage.flatMap((damage, index): StatPart[] =>
        index === 0 ? [damage] : [{ kind: 'text', text: ' plus ' }, damage],
      ),
    ]
  }
  if (ability.save)
    return [
      { kind: 'term', rule: ruleRef('difficulty_class'), label: 'DC' },
      { kind: 'value', text: ` ${saveDc(stats, ability.save.dc)} ${SHORT[ability.save.ability]} ` },
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
          return `${part.amount} (${part.roll})${part.type ? ` ${damageLabel(part.type)}` : ''}`
      }
    })
    .join('')
}

function saveDc(stats: StatBlock, ability: AbilityId) {
  return 8 + proficiencyBonus(stats.cr) + modifier(stats.scores[ability])
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
export function deriveStatBlock(stats: StatBlock): DerivedStats {
  const pb = proficiencyBonus(stats.cr)
  const modifiers = Object.fromEntries(
    ABILITY_KEYS.map((id) => [id, modifier(stats.scores[id])]),
  ) as Record<AbilityId, number>
  const { count } = dice(stats.hitDice)
  const skills = SKILL_KEYS.filter((skill) => stats.skills?.[skill]).map((skill) => ({
    skill,
    label: rules[skill].name,
    bonus: modifiers[skillAbility(skill)] + pb * proficiencyMultiplier(stats.skills?.[skill]),
  }))
  const passivePerception =
    10 + modifiers.wis + pb * proficiencyMultiplier(stats.skills?.perception)
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
    saveDc: Object.fromEntries(ABILITY_KEYS.map((id) => [id, 8 + pb + modifiers[id]])) as Record<
      AbilityId,
      number
    >,
    modifier: modifiers,
    proficiencyBonus: pb,
    maxHp: average(stats.hitDice, count * modifiers.con),
    hitPoints: rollText(stats.hitDice, count * modifiers.con),
    ac: stats.ac,
    initiative: modifiers.dex,
    experience: experience(stats.cr),
    saves: Object.fromEntries(
      ABILITY_KEYS.map((id) => [id, modifiers[id] + pb * proficiencyMultiplier(stats.saves?.[id])]),
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
