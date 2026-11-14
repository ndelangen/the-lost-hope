import type { Ability, AbilityTextToken, Attack, StatBlock } from '#/definitions/stat-block'

import { ruleRef, type RuleKey } from './rules'
import {
  damageLabel,
  deriveAttack,
  modifier,
  plainStatParts,
  proficiencyBonus,
  signed,
  type StatPart,
} from './stat-block'

/**
 * What a DM does with an ability, as numbered steps a new DM can follow without knowing the rules.
 * Steps are generated from the stat block's structure (timing, attack, uses, recharge) and its
 * typed text, never written per creature. Rules words carry a glossary ref so the screen can
 * explain them in place.
 */

export type StepPart = StatPart | { kind: 'tokens'; tokens: readonly AbilityTextToken[] }

export type DmStep = {
  parts: StepPart[]
  /** Sibling abilities this step uses, such as a Multiattack's attacks, shown expanded. */
  expand?: string[]
}

/** Where an ability sits in the stat block, which decides when the DM may use it. */
export type AbilitySource = 'action' | 'bonus action' | 'reaction' | 'trait' | 'legendary' | 'lair'

const text = (value: string): StepPart => ({ kind: 'text', text: value })
const value = (shown: string): StepPart => ({ kind: 'value', text: shown })
const term = (key: RuleKey, label: string): StepPart => ({
  kind: 'term',
  rule: ruleRef(key),
  label,
})

function timingStep(source: AbilitySource, stats: StatBlock): DmStep {
  switch (source) {
    case 'action':
      return { parts: [text('Uses its action on its turn.')] }
    case 'bonus action':
      return {
        parts: [text('Uses its '), term('bonus_action', 'bonus action'), text(' on its turn.')],
      }
    case 'reaction':
      return {
        parts: [
          text('Uses its '),
          term('reaction', 'reaction'),
          text(' when the trigger below happens.'),
        ],
      }
    case 'trait':
      return { parts: [text('Always on. It doesn’t take an action.')] }
    case 'legendary':
      return {
        parts: [
          text('At the end of another creature’s turn, spend 1 of its '),
          value(String(stats.legendary?.uses ?? 1)),
          text(' '),
          term('legendary_action', 'legendary actions'),
          text('. They refill at the start of its own turn.'),
        ],
      }
    case 'lair':
      return {
        parts: [
          text('A '),
          term('lair_action', 'lair action'),
          text(': on '),
          term('initiative', 'initiative'),
          text(' count 20, if it’s in its lair. It can’t pick the same one two rounds in a row.'),
        ],
      }
  }
}

function attackSteps(attack: Attack, stats: StatBlock): DmStep[] {
  const derived = deriveAttack(attack, stats)
  const target: DmStep =
    attack.kind === 'melee'
      ? {
          parts: [
            text('Pick one target within '),
            value(`${attack.reach} ft.`),
            text(' (its '),
            term('reach', 'reach'),
            text(').'),
          ],
        }
      : {
          parts: [
            text('Pick one target within '),
            value(`${attack.range[0]} ft.`),
            text(' (its '),
            term('range', 'range'),
            text('). Out to '),
            value(`${attack.range[1]} ft.`),
            text(' it can still shoot, with '),
            term('disadvantage', 'disadvantage'),
            text('.'),
          ],
        }
  return [
    target,
    {
      parts: [
        text('Make an '),
        term('attack_roll', 'attack roll'),
        text(': roll '),
        value(`d20 ${signed(derived.bonus).replace(/^([+−])/, '$1 ')}`),
        text('. If the total equals or beats the target’s '),
        term('armor_class', 'AC'),
        text(', it hits.'),
      ],
    },
    {
      parts: [
        text('On a hit, deal '),
        ...derived.damage.flatMap((damage, index): StepPart[] =>
          index === 0 ? [damage] : [text(' plus '), damage],
        ),
        text('.'),
      ],
    },
    {
      parts: [
        text('If the d20 shows a 20, it’s a '),
        term('critical_hit', 'critical hit'),
        text(': roll all the damage dice twice.'),
      ],
    },
  ]
}

function saveDc(stats: StatBlock, tokens: readonly AbilityTextToken[]) {
  const token = tokens.find((part) => typeof part === 'object' && 'dc' in part)
  if (!token || typeof token !== 'object' || !('dc' in token)) return undefined
  return 8 + proficiencyBonus(stats.cr) + modifier(stats.scores[token.dc])
}

function textSteps(ability: Ability, stats: StatBlock, attackKeys: ReadonlySet<string>): DmStep[] {
  if (ability.text.length === 0) return []
  const expand = ability.text.flatMap((token) =>
    typeof token === 'object' && 'ability' in token && attackKeys.has(token.ability)
      ? [token.ability]
      : [],
  )
  const multiattack = ability.key === 'multiattack' || ability.name === 'Multiattack'
  const tokens: DmStep = {
    parts: [
      ...(ability.attack ? [text('Also: ')] : []),
      ...(multiattack
        ? [term('multiattack', 'Multiattack'), text(': roll each attack on its own. ')]
        : []),
      { kind: 'tokens', tokens: ability.text },
    ],
    ...(expand.length > 0 ? { expand: [...new Set(expand)] } : {}),
  }
  const dc = saveDc(stats, ability.text)
  if (dc === undefined) return [tokens]
  return [
    tokens,
    {
      parts: [
        text('For the '),
        term('saving_throw', 'saving throw'),
        text(', each creature rolls d20 plus its bonus for the ability named above. '),
        value(`${dc}`),
        text(' or higher ('),
        term('difficulty_class', 'DC'),
        text(') is a success.'),
      ],
    },
  ]
}

function usesStep(ability: Ability): DmStep | undefined {
  const dice = ability.recharge ? /^Recharge (\d)(?:[–-](\d))?$/.exec(ability.recharge) : null
  if (dice) {
    const range = dice[2] ? `${dice[1]}–${dice[2]}` : dice[1]!
    return {
      parts: [
        text('After using it, it’s spent. At the start of its turn, roll a d6: on '),
        value(range),
        text(' it’s ready again ('),
        term('recharge', 'recharge'),
        text(').'),
      ],
    }
  }
  if (ability.uses === undefined) return undefined
  const times = ability.uses === 1 ? 'once' : `${ability.uses} times`
  const rest = ability.recharge?.toLowerCase()
  return {
    parts: [
      text('It can do this '),
      value(times),
      ...(rest === 'long rest'
        ? [text(' '), term('uses_per_day', 'per day'), text(', then it’s spent until a long rest.')]
        : rest
          ? [text(', then it’s spent until a '), value(rest), text('.')]
          : [text(' in this fight.')]),
    ],
  }
}

/** Plain steps for one ability of a stat block. */
export function abilitySteps(ability: Ability, stats: StatBlock, source: AbilitySource): DmStep[] {
  const attackKeys = new Set(
    [...stats.abilities, ...(stats.legendary?.actions ?? [])]
      .filter((candidate) => candidate.attack)
      .map((candidate) => candidate.key),
  )
  const uses = usesStep(ability)
  return [
    timingStep(source, stats),
    ...(ability.attack ? attackSteps(ability.attack, stats) : []),
    ...textSteps(ability, stats, attackKeys),
    ...(uses ? [uses] : []),
  ]
}

/** Every ability's source, so steps know when each one can be used. */
export function abilitySources(stats: StatBlock): ReadonlyMap<string, AbilitySource> {
  return new Map<string, AbilitySource>([
    ...stats.abilities.map((ability) => [ability.key, ability.timing] as const),
    ...(stats.legendary?.actions ?? []).map((ability) => [ability.key, 'legendary'] as const),
    ...(stats.lairActions ?? []).map((ability) => [ability.key, 'lair'] as const),
  ])
}

/** The steps as one line of plain text, for tooltips and tests. */
export function plainSteps(steps: readonly DmStep[]) {
  return steps.map((step) =>
    step.parts
      .map((part) => {
        if (part.kind === 'tokens')
          return part.tokens.map((token) => (typeof token === 'string' ? token : '…')).join('')
        if (part.kind === 'damage')
          return `${part.amount} ${damageLabel(part.type)} damage (or roll ${part.roll})`
        return plainStatParts([part])
      })
      .join(''),
  )
}

/** Steps for every ability in a stat block, keyed by ability key. */
export function stepsByAbility(stats: StatBlock): Readonly<Record<string, readonly DmStep[]>> {
  const sources = abilitySources(stats)
  return Object.fromEntries(
    [...stats.abilities, ...(stats.legendary?.actions ?? []), ...(stats.lairActions ?? [])].map(
      (ability) => [
        ability.key,
        abilitySteps(ability, stats, sources.get(ability.key) ?? 'action'),
      ],
    ),
  )
}
