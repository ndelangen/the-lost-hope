import { z } from 'zod'

import { ABILITY_KEYS } from '#/lib/rules'

import { entityRefOf } from './kind'

/**
 * What an ability, spell or item leaves on someone for a while: Charmed until the aboleth dies,
 * Poisoned for 1 hour, "can't regain hit points". The effect is a sub-entity of its parent, keyed
 * within it, so the encounter tracker applies it by reference and traces it back to its source.
 * The parent's rules text points at the effect instead of restating it.
 *
 * The shapes here are shared; each parent supplies the text tokens its rules text uses.
 */

const AbilityId = z.enum(ABILITY_KEYS)
const RuleRef = entityRefOf('rule')

export const EFFECT_SAVE_MOMENTS = {
  'end-of-turn': 'at the end of each of its turns',
  'start-of-turn': 'at the start of each of its turns',
  damaged: 'whenever it takes damage',
  'every-24-hours': 'every 24 hours',
  'long-rest': 'after each long rest',
} as const

export type EffectSaveMoment = keyof typeof EFFECT_SAVE_MOMENTS

const SaveMoment = z.enum(
  Object.keys(EFFECT_SAVE_MOMENTS) as [EffectSaveMoment, ...EffectSaveMoment[]],
)

export const EffectKey = z
  .string()
  .regex(/^[a-z][a-z0-9-]*$/)
  .describe('Stable id, unique within its stat block, spell or item, e.g. `dominated`')

/**
 * Build the effect schemas for a parent whose rules text is made of `Token`, with `Escape`
 * saying where an escape DC comes from: a creature's ability, or a caster's spell save DC.
 */
export function statusEffectSchemas<Token extends z.ZodType, Escape extends z.ZodType>(
  Token: Token,
  Escape: Escape,
) {
  const Text = z.array(Token).min(1)

  /** How long it lasts, before anything ends it early. */
  const Duration = z.discriminatedUnion('kind', [
    z
      .strictObject({ kind: z.literal('until-removed') })
      .describe('Until something in `ends` or the DM ends it, e.g. prone or a grapple'),
    z.strictObject({
      kind: z.literal('turn'),
      boundary: z.enum(['end', 'start']),
      whose: z
        .enum(['target', 'source'])
        .describe('`target`: "its next turn"; `source`: "the ogre’s next turn", "your next turn"'),
    }),
    z.strictObject({
      kind: z.literal('time'),
      amount: z
        .string()
        .regex(/^([1-9]\d*|\d+d(4|6|8|10|12|20))$/)
        .describe('A number, or dice like `1d4`'),
      unit: z.enum(['round', 'minute', 'hour', 'day']),
    }),
    z.strictObject({
      kind: z.literal('until'),
      text: Text.describe('e.g. "the aboleth dies or is on a different plane of existence"'),
    }),
  ])

  /** What ends it early. */
  const Ends = z.strictObject({
    repeatSave: z
      .array(SaveMoment)
      .min(1)
      .optional()
      .describe('When the target repeats the save that put it on, ending it on a success'),
    escape: Escape.optional().describe(
      'An action to escape against this DC, e.g. a grapple (escape DC 14)',
    ),
    cure: Text.optional().describe('Magic or treatment that removes it, e.g. Lesser Restoration'),
    successes: z
      .number()
      .int()
      .min(2)
      .max(5)
      .optional()
      .describe(
        'How many successful repeat saves end it, when one is not enough ("succeeds on three of these saves")',
      ),
  })

  const own = {
    key: EffectKey,
    name: z.string().trim().min(1).describe('What the DM calls it, e.g. `Aboleth’s curse`'),
    conditions: z
      .array(RuleRef)
      .min(1)
      .optional()
      .describe('Conditions it imposes, e.g. `refs.rules.charmed`'),
    text: Text.optional().describe('What it does beyond its conditions, as full sentences'),
    lasts: Duration,
    ends: Ends.optional(),
  }

  /**
   * What the effect turns into when the target keeps failing its repeat save: the Basilisk's
   * gaze restrains first, and a second failure petrifies instead. The stage replaces the effect
   * whole, with its own conditions and duration, and is keyed like any other effect.
   */
  const Then = z
    .strictObject({
      failures: z
        .number()
        .int()
        .min(1)
        .max(5)
        .describe(
          'Failed repeat saves that bring it on: 1 for "on a failure" or "Second Failure", 3 for "fails three of these saves"',
        ),
      ...own,
      outlastsConcentration: z
        .literal(true)
        .optional()
        .describe(
          'It stays when the caster stops concentrating, e.g. Petrify’s petrification lasts until Greater Restoration',
        ),
    })
    .describe('The stage it becomes after failed repeat saves')

  const shape = {
    ...own,
    becomes: Then.optional(),
  }

  return { Duration, Ends, Then, shape }
}

export { AbilityId as EffectAbilityId, RuleRef as EffectRuleRef }

type Staged = {
  key: string
  conditions?: readonly { key: string }[]
  text?: readonly unknown[]
  ends?: { repeatSave?: readonly string[]; successes?: number }
  becomes?: Staged & { failures: number }
}

/**
 * What every effect must say, whatever its parent: conditions or text, only real conditions, and
 * a counted or staged repeat save only where there is a repeat save. Each problem is one message.
 */
export function stagedEffectProblems(effect: Staged, conditionKeys: readonly string[]): string[] {
  const problems: string[] = []
  for (const stage of [effect, ...(effect.becomes ? [effect.becomes] : [])]) {
    if (!stage.conditions && !stage.text) problems.push(`${stage.key}: needs conditions or text`)
    for (const condition of stage.conditions ?? [])
      if (!conditionKeys.includes(condition.key))
        problems.push(`${stage.key}: ${condition.key} is not a condition`)
  }
  // The tracker asks for counted and staged saves at the end of the target's turn.
  const endOfTurn = effect.ends?.repeatSave?.includes('end-of-turn')
  if (effect.ends?.successes && !endOfTurn)
    problems.push(`${effect.key}: counts successful saves it never repeats at the end of a turn`)
  if (effect.becomes && !endOfTurn)
    problems.push(
      `${effect.key}: turns into ${effect.becomes.key} on failed saves it never repeats at the end of a turn`,
    )
  if (effect.becomes?.ends?.successes)
    problems.push(`${effect.becomes.key}: a later stage ends on one successful save`)
  if (effect.becomes?.key === effect.key)
    problems.push(`${effect.key}: its next stage needs its own key`)
  return problems
}

/**
 * An effect's later stage as an effect of its own: it lands the way the first stage did, on the
 * same save, and has no further stage.
 */
export function stageOf<
  E extends { lands: unknown; becomes?: { failures: number; outlastsConcentration?: true } },
>(effect: E): Omit<E, 'becomes'> {
  const { becomes, ...first } = effect
  if (!becomes) throw new Error('This effect has no later stage')
  const { failures: _, outlastsConcentration: _kept, ...own } = becomes
  return { ...own, lands: first.lands } as unknown as Omit<E, 'becomes'>
}

/**
 * Each effect followed by its later stage, as the DM can apply either: Petrify petrifies at once
 * on a bad failure, and a creature may already be past the first stage.
 */
export function withStages<
  E extends { lands: unknown; becomes?: { failures: number; outlastsConcentration?: true } },
>(effects: readonly E[]): { effect: Omit<E, 'becomes'>; outlastsConcentration?: true }[] {
  return effects.flatMap((effect) => [
    { effect },
    ...(effect.becomes
      ? [
          {
            effect: stageOf(effect),
            ...(effect.becomes.outlastsConcentration
              ? { outlastsConcentration: true as const }
              : {}),
          },
        ]
      : []),
  ])
}
