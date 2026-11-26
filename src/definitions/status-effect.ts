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
  })

  const shape = {
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

  return { Duration, Ends, shape }
}

export { AbilityId as EffectAbilityId, RuleRef as EffectRuleRef }
