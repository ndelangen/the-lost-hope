import type { Ability, AbilityTextToken, Attack, Save } from '#/definitions/stat-block'

import { ruleOf, ruleRef, rules, type RuleKey } from './rules'
import {
  damageLabel,
  deriveAttack,
  deriveSaveDamage,
  modifier,
  plainStatParts,
  allAbilities,
  proficiencyOf,
  type AnyStatBlock,
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
  /**
   * Who acts in this step: the DM for the creature, or the creatures it targets. Absent for a step
   * that only says what is true, such as an effect or an outcome.
   */
  who?: 'dm' | 'target'
  /** Sibling abilities this step uses, such as a Multiattack's attacks, shown expanded. */
  expand?: string[]
}

/** Where an ability sits in the stat block, which decides when the DM may use it. */
type AbilitySource = 'action' | 'bonus action' | 'reaction' | 'trait' | 'legendary' | 'lair'

const text = (value: string): StepPart => ({ kind: 'text', text: value })
const value = (shown: string): StepPart => ({ kind: 'value', text: shown })
const term = (key: RuleKey, label: string): StepPart => ({
  kind: 'term',
  rule: ruleRef(key),
  label,
})

/** A PC's block is read by its own player, so its steps say "you" where a creature's say "it". */
function isPc(stats: AnyStatBlock) {
  return !('cr' in stats)
}

/** What using an ability costs the player: nothing to pick or roll yet, so no one is named. */
function playerTimingStep(source: AbilitySource): DmStep {
  switch (source) {
    case 'bonus action':
      return { parts: [text('Costs your '), term('bonus_action', 'Bonus Action'), text('.')] }
    case 'reaction':
      return {
        parts: [
          text('Costs your '),
          term('reaction', 'Reaction'),
          text(', when the trigger below happens.'),
        ],
      }
    case 'trait':
      return { parts: [text('Always on. No action needed.')] }
    default:
      return { parts: [text('Costs your action this turn.')] }
  }
}

function timingStep(source: AbilitySource, stats: AnyStatBlock): DmStep {
  if (isPc(stats)) return playerTimingStep(source)
  switch (source) {
    case 'action':
      return { who: 'dm', parts: [text('Uses its action on its turn.')] }
    case 'bonus action':
      return {
        who: 'dm',
        parts: [text('Uses its '), term('bonus_action', 'bonus action'), text(' on its turn.')],
      }
    case 'reaction':
      return {
        who: 'dm',
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
        who: 'dm',
        parts: [
          text('At the end of another creature’s turn, spend 1 of its '),
          value(String(('cr' in stats ? stats.legendary?.uses : undefined) ?? 1)),
          text(' '),
          term('legendary_action', 'legendary actions'),
          text('. They refill at the start of its own turn.'),
        ],
      }
    case 'lair':
      return {
        who: 'dm',
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

function attackSteps(attack: Attack, stats: AnyStatBlock): DmStep[] {
  const derived = deriveAttack(attack, stats)
  const you = isPc(stats)
  const target: DmStep =
    attack.kind === 'melee' && attack.reach === 0
      ? {
          who: 'dm',
          parts: [text('Pick one target in '), text(you ? 'your' : 'its'), text(' space.')],
        }
      : attack.kind === 'melee'
        ? {
            who: 'dm',
            parts: [
              text('Pick one target within '),
              value(`${attack.reach} ft.`),
              text(you ? ' (your ' : ' (its '),
              term('reach', 'reach'),
              ...(attack.thrown
                ? [
                    text('), or throw it at one within '),
                    value(`${attack.thrown[0]} ft.`),
                    text(', out to '),
                    value(`${attack.thrown[1]} ft.`),
                    text(' with '),
                    term('disadvantage', 'disadvantage'),
                    text('.'),
                  ]
                : [text(').')]),
            ],
          }
        : {
            who: 'dm',
            parts: [
              text('Pick one target within '),
              value(`${attack.range[0]} ft.`),
              text(you ? ' (your ' : ' (its '),
              term('range', 'range'),
              text('). Out to '),
              value(`${attack.range[1]} ft.`),
              text(you ? ' you can still shoot, with ' : ' it can still shoot, with '),
              term('disadvantage', 'disadvantage'),
              text('.'),
            ],
          }
  return [
    target,
    {
      who: 'dm',
      parts: [
        text('Make an '),
        term('attack_roll', 'attack roll'),
        text(': roll '),
        value(`d20 ${signed(derived.bonus).replace(/^([+−])/, '$1 ')}`),
        text('. If the total equals or beats the target’s '),
        term('armor_class', 'AC'),
        text(you ? ', you hit.' : ', it hits.'),
      ],
    },
    {
      parts: [
        text('On a hit, deal '),
        ...derived.damage.flatMap((damage, index): StepPart[] =>
          index === 0 ? [damage] : [text(' plus '), damage],
        ),
        ...(derived.twoHanded
          ? [
              text(you ? ', or with two hands ' : ', or wielded with two hands '),
              ...derived.twoHanded.flatMap((damage, index): StepPart[] =>
                index === 0 ? [damage] : [text(' plus '), damage],
              ),
            ]
          : []),
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

const COUNT = ['zero', 'one', 'two', 'three', 'four', 'five', 'six']

function targetParts(save: Save, you: boolean): DmStep {
  const { target } = save
  if ('creatures' in target) {
    const count = COUNT[target.creatures] ?? String(target.creatures)
    return {
      parts: [
        text('Pick '),
        value(`${count} ${target.creatures === 1 ? 'creature' : 'creatures'}`),
        ...(target.which ? [text(` ${target.which}`)] : []),
        text(' within '),
        value(`${target.range} ft.`),
        text('.'),
      ],
    }
  }
  const { shape, size, width } = target.area
  const where = target.range
    ? [text(' anywhere within '), value(`${target.range} ft.`)]
    : [text(you ? ' starting from you' : ' starting from it')]
  const chosen = target.chosen
    ? [
        text(
          ` ${you ? 'You pick' : 'It picks'} which creatures in it are affected; the rest are safe.`,
        ),
      ]
    : []
  const name = (label: string) => term(shape.key as RuleKey, label)
  switch (shape.key) {
    case 'emanation':
      return {
        parts: [
          text('Everything within '),
          value(`${size} ft.`),
          text(you ? ' of you is caught (an ' : ' of it is caught (an '),
          name('emanation'),
          text(').'),
          ...chosen,
        ],
      }
    case 'sphere':
      return {
        parts: [
          text('Choose a point'),
          ...where,
          text('. Everything within '),
          value(`${size} ft.`),
          text(' of that point is caught (a '),
          name('sphere'),
          text(').'),
          ...chosen,
        ],
      }
    case 'line':
      return {
        parts: [
          text('Choose a '),
          value(`${size} ft. long, ${width} ft. wide`),
          text(' '),
          name('line'),
          ...where,
          text('.'),
          ...chosen,
        ],
      }
    default:
      return {
        parts: [
          text('Choose a '),
          value(`${size}-ft.`),
          text(' '),
          name(ruleOf(shape).name.toLowerCase()),
          ...where,
          text('.'),
          ...chosen,
        ],
      }
  }
}

function targetStep(save: Save, you: boolean): DmStep {
  return { who: 'dm', ...targetParts(save, you) }
}

function saveSteps(save: Save, stats: AnyStatBlock): DmStep[] {
  const dc = save.printedDc ?? 8 + proficiencyOf(stats) + modifier(stats.scores[save.dc])
  const ability = rules[save.ability].name
  const who =
    'creatures' in save.target && save.target.creatures === 1
      ? 'The target rolls'
      : 'Every creature in it rolls'
  const damage = deriveSaveDamage(save, stats)
  const conditions = save.onFail.conditions ?? []
  const fail: StepPart[] = [
    ...(damage.length > 0
      ? [
          text('take '),
          ...damage.flatMap((part, index): StepPart[] =>
            index === 0 ? [part] : [text(' plus '), part],
          ),
        ]
      : []),
    ...conditions.flatMap((condition, index): StepPart[] => [
      text(index === 0 ? (damage.length > 0 ? ' and it has the ' : 'it has the ') : ' and '),
      term(condition.key as RuleKey, ruleOf(condition).name.toLowerCase()),
      ...(index === conditions.length - 1
        ? [text(conditions.length > 1 ? ' conditions' : ' condition')]
        : []),
    ]),
    ...(damage.length > 0 || conditions.length > 0 ? [text('.')] : []),
    ...(save.onFail.also
      ? [
          ...(damage.length > 0 || conditions.length > 0 ? [text(' ')] : []),
          { kind: 'tokens', tokens: save.onFail.also } as const,
        ]
      : []),
  ]
  const half = damage.map((part) => Math.floor(part.amount / 2))
  return [
    targetStep(save, isPc(stats)),
    {
      who: 'target',
      parts: [
        text(`${who} a `),
        term('difficulty_class', 'DC'),
        value(` ${dc} ${ability}`),
        text(' '),
        term('saving_throw', 'saving throw'),
        text(`: d20 + its ${ability} save bonus. `),
        value(`${dc}`),
        text(' or higher succeeds.'),
      ],
    },
    { parts: [text('Fail: '), ...fail] },
    save.onSuccess === 'half'
      ? {
          parts: [
            text('Success: take '),
            term('half_damage', 'half'),
            text(' ('),
            value(half.join(' + ')),
            text(').'),
          ],
        }
      : { parts: [text('Success: nothing happens.')] },
  ]
}

/** A full stop that ends a sentence, not an abbreviation such as "ft." or "Mr.". */
const SENTENCE_END = String.raw`(?<!\b(?:ft|Mr|Mrs|Dr|St|vs))[.!?][”’)]*`
const INSIDE = new RegExp(String.raw`(?<=${SENTENCE_END})\s+(?=[A-Z“‘(])`)
const AT_END = new RegExp(String.raw`${SENTENCE_END}\s+$`)

/** Rules text cut into its sentences, so each one reads as a step of its own. */
export function sentences(tokens: readonly AbilityTextToken[]): AbilityTextToken[][] {
  const out: AbilityTextToken[][] = [[]]
  tokens.forEach((token, index) => {
    if (typeof token !== 'string') {
      out.at(-1)!.push(token)
      return
    }
    token.split(INSIDE).forEach((piece, pieceIndex) => {
      if (pieceIndex > 0) out.push([])
      if (piece) out.at(-1)!.push(piece)
    })
    if (index < tokens.length - 1 && AT_END.test(token)) out.push([])
  })
  return out.filter((sentence) => sentence.length > 0)
}

function textSteps(ability: Ability, attackKeys: ReadonlySet<string>): DmStep[] {
  const multiattack = ability.key === 'multiattack' || ability.name === 'Multiattack'
  return sentences(ability.text).map((tokens, index) => {
    const expand = tokens.flatMap((token) =>
      typeof token === 'object' && 'ability' in token && attackKeys.has(token.ability)
        ? [token.ability]
        : [],
    )
    return {
      parts: [
        ...(index === 0 && ability.attack ? [text('Also: ')] : []),
        ...(index === 0 && multiattack
          ? [term('multiattack', 'Multiattack'), text(': roll each attack on its own. ')]
          : []),
        { kind: 'tokens', tokens },
      ],
      ...(expand.length > 0 ? { expand: [...new Set(expand)] } : {}),
    }
  })
}

function usesStep(ability: Ability, you: boolean): DmStep | undefined {
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
  if (you) return undefined
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
export function abilitySteps(
  ability: Ability,
  stats: AnyStatBlock,
  source: AbilitySource,
): DmStep[] {
  const attackKeys = new Set(
    [...stats.abilities, ...('cr' in stats ? (stats.legendary?.actions ?? []) : [])]
      .filter((candidate) => candidate.attack)
      .map((candidate) => candidate.key),
  )
  // A player's sheet counts uses beside the ability and says which rest brings them back.
  const uses = usesStep(ability, isPc(stats))
  const steps = [
    timingStep(source, stats),
    ...(ability.attack ? attackSteps(ability.attack, stats) : []),
    ...textSteps(ability, attackKeys),
    ...(ability.save ? saveSteps(ability.save, stats) : []),
    ...(uses ? [uses] : []),
  ]
  return steps.map(tidy)
}

/** "within 60 ft." followed by "." reads as one full stop. */
function tidy(step: DmStep): DmStep {
  const parts = step.parts.map((part, index) => {
    const before = step.parts[index - 1]
    if (
      part.kind === 'text' &&
      part.text.startsWith('.') &&
      before?.kind === 'value' &&
      before.text.endsWith('.')
    )
      return text(part.text.slice(1))
    return part
  })
  return { ...step, parts: parts.filter((part) => part.kind !== 'text' || part.text !== '') }
}

/** Every ability's source, so steps know when each one can be used. */
export function abilitySources(stats: AnyStatBlock): ReadonlyMap<string, AbilitySource> {
  return new Map<string, AbilitySource>([
    ...stats.abilities.map((ability) => [ability.key, ability.timing] as const),
    ...('cr' in stats ? (stats.legendary?.actions ?? []) : []).map(
      (ability) => [ability.key, 'legendary'] as const,
    ),
    ...('cr' in stats ? (stats.lairActions ?? []) : []).map(
      (ability) => [ability.key, 'lair'] as const,
    ),
  ])
}

/** The steps as one line of plain text, for tooltips and tests. */
export function plainSteps(steps: readonly DmStep[]) {
  return steps.map((step) =>
    step.parts
      .map((part) => {
        if (part.kind === 'tokens')
          return part.tokens
            .map((token) =>
              typeof token === 'string'
                ? token
                : 'ref' in token
                  ? ruleOf(token).name.toLowerCase()
                  : '…',
            )
            .join('')
        if (part.kind === 'damage')
          return `${part.amount}${part.type ? ` ${damageLabel(part.type)}` : ''} damage (or roll ${part.roll})`
        return plainStatParts([part])
      })
      .join(''),
  )
}

/** Steps for every ability in a stat block, keyed by ability key. */
export function stepsByAbility(stats: AnyStatBlock): Readonly<Record<string, readonly DmStep[]>> {
  const sources = abilitySources(stats)
  return Object.fromEntries(
    allAbilities(stats).map((ability) => [
      ability.key,
      abilitySteps(ability, stats, sources.get(ability.key) ?? 'action'),
    ]),
  )
}
