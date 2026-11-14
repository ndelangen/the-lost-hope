import { z } from 'zod'

import { Background } from './content'
import { makeCreate } from './create'
import { ENTITY_KINDS, entityRefOf } from './kind'
import { deriveSlug } from './slug'

/** DM-fired moments an effect can ask to be reminded about (see issue #171). */
export const EFFECT_TRIGGERS = {
  newDay: 'New campaign day',
  encounterStart: 'Encounter starts',
  longRest: 'Long rest',
  wouldDie: 'Would die',
} as const

export type EffectTrigger = keyof typeof EFFECT_TRIGGERS

export const DAMAGE_TYPES = [
  'acid',
  'bludgeoning',
  'cold',
  'fire',
  'force',
  'lightning',
  'necrotic',
  'piercing',
  'poison',
  'psychic',
  'radiant',
  'slashing',
  'thunder',
] as const

export type DamageType = (typeof DAMAGE_TYPES)[number]

const Dice = z.string().regex(/^\d+d(4|6|8|10|12|20)$/, 'Use dice like `2d6`')

/**
 * Rules text as read at the table: plain strings, typed references to campaign records, and
 * damage rolls the DM tool can show and roll in place.
 */
export const EffectTextToken = z.union([
  z.string().min(1),
  z.strictObject({
    ref: z.enum(ENTITY_KINDS),
    key: z.string().min(1),
  }),
  z.strictObject({ dice: Dice, type: z.enum(DAMAGE_TYPES) }),
])

export type EffectTextToken = z.infer<typeof EffectTextToken>

/** Paragraphs of rules tokens. */
export const EffectText = z.array(z.array(EffectTextToken).min(1)).min(1)

export type EffectText = z.infer<typeof EffectText>

const Span = z
  .strictObject({
    hours: z.number().int().positive().optional(),
    days: z.number().int().positive().optional(),
    months: z.number().int().positive().optional(),
    years: z.number().int().positive().optional(),
  })
  .refine((span) => Object.values(span).some(Boolean), 'Give at least one unit')

export type Span = z.infer<typeof Span>

/**
 * "Do this within a span or suffer the consequence." The DM tool keeps when the clock last reset
 * in browser state; the record only owns the rule.
 */
const Obligation = z.strictObject({
  label: z.string().trim().min(1).describe('What must be done, e.g. `Store a spell`'),
  within: Span,
  otherwise: z
    .array(EffectTextToken)
    .min(1)
    .describe('What happens when the span runs out, e.g. `[{ dice: "2d8", type: "force" }]`'),
})

const Reminder = z.strictObject({
  on: z.enum(Object.keys(EFFECT_TRIGGERS) as [EffectTrigger, ...EffectTrigger[]]),
  reminder: EffectText,
})

/**
 * A lasting effect on a PC, NPC, or beast: a curse, a card's boon, a bargain, a transformation.
 * The effect owns its rules; events reference it instead of restating them. Whether it is active,
 * ended, or expired is derived from `began`, `ended`, and `duration`.
 */
export const Effect = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1).describe('The canonical name, e.g. `Vessel`'),
    icon: z.string().describe('Icon-catalog id, e.g. `gi/GiLightningStorm`'),
    on: z
      .union([entityRefOf('pc'), entityRefOf('npc'), entityRefOf('beast')])
      .describe('Who carries the effect'),
    cause: z
      .union([entityRefOf('item'), entityRefOf('npc'), entityRefOf('location')])
      .optional()
      .describe('The thing that caused it, when one is known'),
    began: entityRefOf('event').describe('The event in which the effect took hold'),
    ended: entityRefOf('event')
      .optional()
      .describe('The event in which it was lifted. Omit while it lasts or when it simply expired.'),
    duration: Span.optional().describe('How long it lasts from `began`. Omit when permanent.'),
    rules: EffectText.describe('What the effect does at the table'),
    removal: EffectText.optional().describe('What can end it early, when that is known'),
    triggers: z.array(Reminder).optional(),
    obligations: z.array(Obligation).optional(),
    background: Background,
  }),
)

export const create = makeCreate(Effect)

export type Effect = z.infer<typeof Effect>
