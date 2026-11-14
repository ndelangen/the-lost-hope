import {
  ABILITY_IDS,
  SKILLS,
  type Ability,
  type AbilityId,
  type Attack,
  type ChallengeRating,
  type Skill,
  type StatBlock,
} from '#/definitions/stat-block'

import type { DerivedStatBlock } from './dm-ability-text'
import { ruleOf } from './rules'

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
export function experience(cr: ChallengeRating) {
  return XP[cr] ?? 0
}

function dice(notation: string) {
  const [count, faces] = notation.split('d').map(Number)
  return { count: count!, faces: faces! }
}

/** Average of a dice expression plus a flat bonus, rounded down, as stat blocks print it. */
export function average(notation: string, bonus = 0) {
  const { count, faces } = dice(notation)
  return Math.floor((count * (faces + 1)) / 2) + bonus
}

/** "22 (3d10 + 6)" */
export function rollText(notation: string, bonus: number) {
  const flat = bonus === 0 ? '' : ` ${bonus > 0 ? '+' : '−'} ${Math.abs(bonus)}`
  return `${average(notation, bonus)} (${notation}${flat})`
}

const SHORT = { str: 'Str', dex: 'Dex', con: 'Con', int: 'Int', wis: 'Wis', cha: 'Cha' } as const

export const SKILL_LABELS: Record<Skill, string> = {
  acrobatics: 'Acrobatics',
  animalHandling: 'Animal Handling',
  arcana: 'Arcana',
  athletics: 'Athletics',
  deception: 'Deception',
  history: 'History',
  insight: 'Insight',
  intimidation: 'Intimidation',
  investigation: 'Investigation',
  medicine: 'Medicine',
  nature: 'Nature',
  perception: 'Perception',
  performance: 'Performance',
  persuasion: 'Persuasion',
  religion: 'Religion',
  sleightOfHand: 'Sleight of Hand',
  stealth: 'Stealth',
  survival: 'Survival',
}

/** Every ability in the block, including legendary and lair actions. */
export function allAbilities(stats: StatBlock): readonly Ability[] {
  return [...stats.abilities, ...(stats.legendary?.actions ?? []), ...(stats.lairActions ?? [])]
}

function proficiencyMultiplier(level: 'proficient' | 'expert' | undefined) {
  return level === 'expert' ? 2 : level === 'proficient' ? 1 : 0
}

export type DerivedAttack = {
  bonus: number
  /** "reach 5 ft." or "range 100/400 ft." */
  distance: string
  /** "8 (1d10 + 3) piercing plus 7 (2d6) poison" */
  damage: string
}

export function deriveAttack(attack: Attack, stats: StatBlock): DerivedAttack {
  const mod = modifier(stats.scores[attack.ability])
  return {
    bonus: mod + proficiencyBonus(stats.cr),
    distance:
      attack.kind === 'melee' ? `reach ${attack.reach} ft.` : `range ${attack.range.join('/')} ft.`,
    damage: attack.damage
      .map(
        (roll) =>
          `${rollText(roll.dice, roll.addModifier ? mod : 0)} ${ruleOf(roll.type).name.toLowerCase()}`,
      )
      .join(' plus '),
  }
}

/** "Melee +5, reach 5 ft. · Hit: 8 (1d10 + 3) piercing" */
export function attackLine(attack: Attack, stats: StatBlock) {
  const derived = deriveAttack(attack, stats)
  const kind = attack.kind === 'melee' ? 'Melee' : 'Ranged'
  return `${kind} ${signed(derived.bonus)}, ${derived.distance} · Hit: ${derived.damage}`
}

/** "+5, 8 (1d10 + 3) piercing" for attacks, or the save DC an ability's text asks for. */
export function abilitySummary(ability: Ability, stats: StatBlock): string | undefined {
  if (ability.attack) {
    const derived = deriveAttack(ability.attack, stats)
    return `${signed(derived.bonus)}, ${derived.damage}`
  }
  const dc = ability.text.find((token) => typeof token === 'object' && 'dc' in token)
  if (dc && typeof dc === 'object' && 'dc' in dc)
    return `DC ${saveDc(stats, dc.dc)} ${SHORT[dc.dc]}`
  return undefined
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
  senses: string
}

/** The numbers a stat block implies: HP, bonuses, DCs, and what ability text refers to. */
export function deriveStatBlock(stats: StatBlock): DerivedStats {
  const pb = proficiencyBonus(stats.cr)
  const modifiers = Object.fromEntries(
    ABILITY_IDS.map((id) => [id, modifier(stats.scores[id])]),
  ) as Record<AbilityId, number>
  const { count } = dice(stats.hitDice)
  const skills = (Object.keys(SKILLS) as Skill[])
    .filter((skill) => stats.skills?.[skill])
    .map((skill) => ({
      skill,
      label: SKILL_LABELS[skill],
      bonus: modifiers[SKILLS[skill]] + pb * proficiencyMultiplier(stats.skills?.[skill]),
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
          attack: ability.attack ? attackLine(ability.attack, stats) : undefined,
        },
      ]),
    ),
    saveDc: Object.fromEntries(ABILITY_IDS.map((id) => [id, 8 + pb + modifiers[id]])) as Record<
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
      ABILITY_IDS.map((id) => [id, modifiers[id] + pb * proficiencyMultiplier(stats.saves?.[id])]),
    ) as Record<AbilityId, number>,
    skills,
    passivePerception,
    senses: [
      ...Object.entries(stats.senses ?? {}).map(
        ([sense, feet]) => `${sense.charAt(0).toUpperCase()}${sense.slice(1)} ${feet} ft.`,
      ),
      `Passive Perception ${passivePerception}`,
    ].join(', '),
  }
}
