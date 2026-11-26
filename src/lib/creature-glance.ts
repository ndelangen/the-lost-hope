import type { Ability, OwnOrSharedStatBlock, StatBlock } from '#/definitions/stat-block'
import { abilityGroups, type AbilityGroupKey } from '#/lib/ability-index'
import { plainAbilityText, abilityTextSegments } from '#/lib/dm-ability-text'
import { creatures, resolveStatBlock } from '#/lib/dm-campaign'
import { ruleOf } from '#/lib/rules'
import {
  abilitySummary,
  damageLabel,
  deriveStatBlock,
  formatSpeed,
  plainStatParts,
  signed,
  type StatPart,
} from '#/lib/stat-block'

/** Where a glance row sits: what it does on its turn, off it, now and then, or always. */
export type GlanceGroup = 'turn' | 'reaction' | 'limited' | 'trait'

export type GlanceRow = { group: GlanceGroup; name: string; summary: string }

/** A creature at a glance, for a DM's hover card: how dangerous it is and what it does. */
export type CreatureGlance = {
  /** "Medium humanoid" */
  kind: string
  /** The shared creature's name when the record uses one, e.g. "Gladiator". */
  shared?: string
  cr: string
  /** "1,800" */
  xp: string
  ac: number
  /** Average hit points. */
  hp: number
  /** "30 ft., climb 30 ft." */
  speed: string
  /** "+2" */
  initiative: string
  rows: GlanceRow[]
  /** "Resists fire", "Immune to poisoned", ... */
  defences: string[]
  /** Rows left out of the card, and the legendary and lair actions it only counts. */
  overflow: { rows: number; legendary: number; lair: number }
}

/** About as many rows as a hover card holds before it turns into a stat block. */
const MAX_ROWS = 8

const ROW_ORDER: readonly GlanceGroup[] = ['turn', 'reaction', 'limited', 'trait']

/** The card for a record's stat block, its own or the shared creature's; none without one. */
export function creatureGlance(
  stats: OwnOrSharedStatBlock | undefined,
): CreatureGlance | undefined {
  const block = resolveStatBlock(stats)
  if (!block) return undefined
  const derived = deriveStatBlock(block)
  const groups = abilityGroups(block)
  const own = groups.filter((group) => group.key !== 'legendary' && group.key !== 'lair')
  const rows = own
    .flatMap((group) =>
      group.abilities.map((ability) => glanceRow(ability, group.key, block, derived)),
    )
    .toSorted((a, b) => rank(a) - rank(b))
    .map(({ row }) => row)
  const count = (key: 'legendary' | 'lair') =>
    groups.find((group) => group.key === key)?.abilities.length ?? 0

  return {
    kind: capitalise(`${block.size} ${block.type}`),
    ...(stats && 'ref' in stats && Object.hasOwn(creatures, stats.key)
      ? { shared: creatures[stats.key]!.name }
      : {}),
    cr: block.cr,
    xp: derived.experience.toLocaleString('en-US'),
    ac: derived.ac,
    hp: derived.maxHp,
    speed: formatSpeed(block.speed),
    initiative: signed(derived.initiative),
    rows: rows.slice(0, MAX_ROWS),
    defences: defences(block),
    overflow: {
      rows: Math.max(0, rows.length - MAX_ROWS),
      legendary: count('legendary'),
      lair: count('lair'),
    },
  }
}

type Derived = ReturnType<typeof deriveStatBlock>

function glanceRow(ability: Ability, timing: AbilityGroupKey, block: StatBlock, derived: Derived) {
  const limited = ability.uses !== undefined || ability.recharge !== undefined
  const group: GlanceGroup =
    timing === 'trait' ? 'trait' : timing === 'reaction' ? 'reaction' : limited ? 'limited' : 'turn'
  const numbers = abilitySummary(ability, block)
  // Named abilities stay names: their numbers have rows of their own.
  const rider = firstSentence(
    plainAbilityText(
      abilityTextSegments(ability.text, derived).map((segment) =>
        segment.kind === 'ability' ? { ...segment, summary: undefined } : segment,
      ),
    ),
  )
  const summary = [
    limited ? usesLabel(ability) : undefined,
    numbers ? glanceParts(numbers) : undefined,
    // An attack's text is only what happens beyond the damage; anything else is all in the text.
    rider,
  ]
    .filter(Boolean)
    .join(' · ')
  return { row: { group, name: ability.name, summary }, ability }
}

/** Multiattack, then attacks, then everything else, each group in stat-block order. */
function rank({ row, ability }: { row: GlanceRow; ability: Ability }) {
  const within =
    row.group === 'turn'
      ? ability.key === 'multiattack' || row.name === 'Multiattack'
        ? 0
        : ability.attack
          ? 1
          : 2
      : 0
  return ROW_ORDER.indexOf(row.group) * 10 + within
}

/** "+7, 11 bludgeoning": averages only, without the dice to roll instead. */
function glanceParts(parts: readonly StatPart[]) {
  return parts
    .map((part) =>
      part.kind === 'damage'
        ? `${part.amount}${part.type ? ` ${damageLabel(part.type)}` : ''}`
        : plainStatParts([part]),
    )
    .join('')
}

function usesLabel(ability: Ability) {
  if (ability.recharge) return ability.recharge
  return ability.uses === 1 ? '1 use' : `${ability.uses} uses`
}

function firstSentence(text: string) {
  const trimmed = text.trim()
  if (!trimmed) return undefined
  const end = trimmed.search(/[.!?](\s|$)/u)
  return end === -1 ? trimmed : trimmed.slice(0, end + 1)
}

function names(refs: StatBlock['damageResistances']) {
  return (refs ?? []).map((ref) => ruleOf(ref).name.toLowerCase()).join(', ')
}

function defences(block: StatBlock): string[] {
  const nonmagical = block.nonmagicalExcept
    ? ` from nonmagical, non-${block.nonmagicalExcept} attacks`
    : ' from nonmagical attacks'
  return [
    block.damageVulnerabilities?.length
      ? `Vulnerable to ${names(block.damageVulnerabilities)}`
      : '',
    block.damageResistances?.length ? `Resists ${names(block.damageResistances)}` : '',
    block.nonmagicalResistances?.length
      ? `Resists ${names(block.nonmagicalResistances)}${nonmagical}`
      : '',
    block.damageImmunities?.length ? `Immune to ${names(block.damageImmunities)}` : '',
    block.nonmagicalImmunities?.length
      ? `Immune to ${names(block.nonmagicalImmunities)}${nonmagical}`
      : '',
    block.conditionImmunities?.length ? `Can't be ${names(block.conditionImmunities)}` : '',
  ].filter(Boolean)
}

function capitalise(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
