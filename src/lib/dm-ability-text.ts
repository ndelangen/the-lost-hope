import type { AbilityTextToken } from '#/definitions/stat-block'

import type { DmStep } from './ability-steps'
import { ruleOf, rules, termLabel, type AbilityId, type RuleRef } from './rules'
import { plainStatParts, signed, type StatPart } from './stat-block'

/**
 * Ability text that answers its own questions. Rules text is a list of tokens: plain strings and
 * typed references to the creature's speed, its other abilities, its numbers, and rules terms.
 * `abilityTextSegments` turns tokens into display segments using the creature's derived stat
 * block, so the DM reads "25 ft." and "Bite +5, 2d6 + 3 piercing" instead of looking them up.
 *
 * Tokens are defined by the stat block schema; `deriveStatBlock` in `./stat-block` builds the
 * derived block.
 */

export type { AbilityTextToken }

type SpeedMode = 'walk' | 'climb' | 'fly' | 'swim' | 'burrow'

/** What the renderer needs from a creature's derived stat block. */
export type DerivedAbilityFacts = {
  key: string
  name: string
  /** The numbers that matter at the table, such as "+5, 8 (2d6 + 3) piercing" or "DC 13 Str save". */
  summary?: readonly StatPart[]
}

export type DerivedStatBlock = {
  speed: Partial<Record<SpeedMode, number>>
  abilities: Readonly<Record<string, DerivedAbilityFacts>>
  saveDc: Partial<Record<AbilityId, number>>
  modifier: Record<AbilityId, number>
  proficiencyBonus: number
  /** Plain DM steps per ability key, from `src/lib/ability-steps.ts`. */
  steps?: Readonly<Record<string, readonly DmStep[]>>
}

export type AbilityTextSegment =
  | { kind: 'text'; text: string }
  | { kind: 'speed'; value: string; note: string }
  | { kind: 'ability'; key: string; name: string; summary?: readonly StatPart[] }
  | { kind: 'number'; value: string; note: string }
  | { kind: 'rule'; rule: RuleRef; label: string }

export function formatFeet(feet: number) {
  const whole = Math.floor(feet)
  if (feet - whole === 0.5) return `${whole === 0 ? '' : whole}½ ft.`
  return `${feet} ft.`
}

function speedPhrase(mode: SpeedMode, times: number) {
  const which = mode === 'walk' ? 'its speed' : `its ${mode} speed`
  if (times === 1) return which
  if (times === 0.5) return `half ${which}`
  if (times === 2) return `twice ${which}`
  return `${times} × ${which}`
}

function segmentFor(
  token: AbilityTextToken,
  block: DerivedStatBlock,
  textBefore: string,
): AbilityTextSegment {
  if (typeof token === 'string') return { kind: 'text', text: token }

  if ('ref' in token) {
    return { kind: 'rule', rule: token, label: termLabel(ruleOf(token), textBefore) }
  }

  if ('speed' in token) {
    const times = token.times ?? 1
    const base = block.speed[token.speed]
    const phrase = speedPhrase(token.speed, times)
    if (base === undefined) return { kind: 'text', text: phrase }
    return {
      kind: 'speed',
      value: formatFeet(base * times),
      note: `${phrase.charAt(0).toUpperCase()}${phrase.slice(1)} (${formatFeet(base)})`,
    }
  }

  if ('ability' in token) {
    const ability = block.abilities[token.ability]
    if (!ability) return { kind: 'text', text: token.ability }
    return { kind: 'ability', key: ability.key, name: ability.name, summary: ability.summary }
  }

  if ('dc' in token) {
    const dc = block.saveDc[token.dc]
    const save = rules[token.save ?? token.dc].name
    return dc === undefined
      ? { kind: 'text', text: `${save} save` }
      : {
          kind: 'number',
          value: `DC ${dc}`,
          note: `The target rolls d20 + its ${save} saving throw bonus and succeeds on ${dc} or higher.`,
        }
  }

  if ('toHit' in token) {
    return {
      kind: 'number',
      value: signed(block.modifier[token.toHit] + block.proficiencyBonus),
      note: `Attack roll bonus: ${rules[token.toHit].name} modifier plus proficiency`,
    }
  }

  if ('mod' in token) {
    return {
      kind: 'number',
      value: signed(block.modifier[token.mod]),
      note: `${rules[token.mod].name} modifier`,
    }
  }

  return { kind: 'number', value: signed(block.proficiencyBonus), note: 'Proficiency bonus' }
}

/** Resolve ability text tokens against the creature's derived stat block. */
export function abilityTextSegments(
  tokens: readonly AbilityTextToken[],
  block: DerivedStatBlock,
): AbilityTextSegment[] {
  let before = ''
  return tokens.map((token) => {
    const segment = segmentFor(token, block, before)
    before += plainAbilityText([segment])
    return segment
  })
}

/** The resolved text as one string, for places that can only show plain text, like tooltips. */
export function plainAbilityText(segments: readonly AbilityTextSegment[]) {
  return segments
    .map((segment) => {
      switch (segment.kind) {
        case 'text':
          return segment.text
        case 'speed':
        case 'number':
          return segment.value
        case 'ability':
          return segment.summary
            ? `${segment.name} (${plainStatParts(segment.summary)})`
            : segment.name
        case 'rule':
          return segment.label
      }
    })
    .join('')
}
