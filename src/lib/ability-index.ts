import { ABILITY_TIMINGS, type Ability, type AbilityTiming } from '#/definitions/stat-block'

import { abilityKind, type AbilityKind, type AnyStatBlock } from './stat-block'

/** Where an ability sits in a stat block: its timing, or the legendary or lair pool. */
export type AbilityGroupKey = AbilityTiming | 'legendary' | 'lair'

export const ABILITY_GROUP_LABEL = {
  trait: 'Traits',
  action: 'Actions',
  'bonus action': 'Bonus actions',
  reaction: 'Reactions',
  legendary: 'Legendary actions',
  lair: 'Lair actions',
} satisfies Record<AbilityGroupKey, string>

export type AbilityGroup = {
  key: AbilityGroupKey
  label: string
  /** When the whole group may be used, for the pools that have a rule of their own. */
  note?: string
  abilities: readonly Ability[]
}

/** Traits first, then what it does on its turn, then what it does on others' turns. */
const ORDER = ['trait', ...ABILITY_TIMINGS.filter((timing) => timing !== 'trait')] as const

/** A stat block's abilities in reading order, without the empty groups. */
export function abilityGroups(stats: AnyStatBlock): AbilityGroup[] {
  const groups: AbilityGroup[] = ORDER.map((timing) => ({
    key: timing,
    label: ABILITY_GROUP_LABEL[timing],
    abilities: stats.abilities.filter((ability) => ability.timing === timing),
  }))
  if (stats.legendary)
    groups.push({
      key: 'legendary',
      label: ABILITY_GROUP_LABEL.legendary,
      note: `${stats.legendary.uses} per round${stats.legendary.lairUses ? ` (${stats.legendary.lairUses} in its lair)` : ''}, at the end of another creature's turn; spent uses come back at the start of its turn.`,
      abilities: stats.legendary.actions,
    })
  if (stats.lairActions)
    groups.push({
      key: 'lair',
      label: ABILITY_GROUP_LABEL.lair,
      note: 'In its lair, one of these on initiative 20 each round; not the same one twice in a row.',
      abilities: stats.lairActions,
    })
  return groups.filter((group) => group.abilities.length > 0)
}

/** One ability as a quick list shows it: enough to recognise it and jump to it. */
export type AbilityIndexEntry = {
  /** The ability's key in its stat block. */
  key: string
  name: string
  /** Icon-catalog id, e.g. `gi/GiSilence`. */
  icon: string
  kind: AbilityKind
  /** How often it can be used before it needs recharging; absent when unlimited. */
  uses?: number
  /** The id of the ability's card on a page that writes every ability out. */
  anchor: string
  /** For an attack: melee or ranged, and how far it reaches. */
  reach?: AttackReach
}

/** "Melee · 5 ft.", "Ranged · 80/320 ft.", "Melee · 5 ft. or thrown 20/60 ft." */
export type AttackReach = { kind: 'melee' | 'ranged'; text: string }

export function attackReach(ability: Pick<Ability, 'attack'>): AttackReach | undefined {
  const { attack } = ability
  if (!attack) return undefined
  if (attack.kind === 'ranged')
    return { kind: 'ranged', text: `Ranged · ${attack.range[0]}/${attack.range[1]} ft.` }
  return {
    kind: 'melee',
    text: `Melee · ${attack.reach} ft.${attack.thrown ? ` or thrown ${attack.thrown[0]}/${attack.thrown[1]} ft.` : ''}`,
  }
}

export type AbilityIndexGroup = {
  key: AbilityGroupKey
  label: string
  entries: AbilityIndexEntry[]
}

/** The id an ability's card carries on a page, so a quick list can jump to it. */
export function abilityAnchor(key: string) {
  return `ability-${key}`
}

/** Every ability and spell of a stat block as a short list to find one in, in reading order. */
export function abilityIndex(stats: AnyStatBlock): AbilityIndexGroup[] {
  return abilityGroups(stats).map(({ key, label, abilities }) => ({
    key,
    label,
    entries: abilities.map((ability) => ({
      key: ability.key,
      name: ability.name,
      icon: ability.icon,
      kind: abilityKind(ability),
      ...(ability.uses ? { uses: ability.uses } : {}),
      anchor: abilityAnchor(ability.key),
      ...(ability.attack ? { reach: attackReach(ability) } : {}),
    })),
  }))
}
