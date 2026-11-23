import { z } from 'zod'

import { Background } from './content'
import { makeCreate } from './create'
import { ENTITY_KINDS, entityRefOf } from './kind'
import { deriveSlug } from './slug'
import { Span } from './span'

/** DM-fired moments an effect can ask to be reminded about (see issue #171). */
export const EFFECT_TRIGGERS = {
  newDay: 'New campaign day',
  encounterStart: 'Encounter starts',
  longRest: 'Long rest',
  wouldDie: 'Would die',
} as const

export type EffectTrigger = keyof typeof EFFECT_TRIGGERS

const Dice = z.string().regex(/^\d+d(4|6|8|10|12|20)$/, 'Use dice like `2d6`')

/**
 * Rules text as read at the table: plain strings, typed references to campaign records and rules
 * terms, and damage rolls the DM tool can show and roll in place.
 */
export const EffectTextToken = z.union([
  z.string().min(1),
  z.strictObject({
    ref: z.enum(ENTITY_KINDS),
    key: z.string().min(1),
  }),
  entityRefOf('rule'),
  z.strictObject({
    dice: Dice,
    type: entityRefOf('rule').describe('A damage type, e.g. `refs.rules.force`'),
  }),
])

export type EffectTextToken = z.infer<typeof EffectTextToken>

/** Paragraphs of rules tokens. */
export const EffectText = z.array(z.array(EffectTextToken).min(1)).min(1)

export type EffectText = z.infer<typeof EffectText>

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
    .describe(
      'What happens when the span runs out, e.g. `[{ dice: "2d8", type: refs.rules.force }]`',
    ),
})

const Reminder = z.strictObject({
  on: z.enum(Object.keys(EFFECT_TRIGGERS) as [EffectTrigger, ...EffectTrigger[]]),
  reminder: EffectText,
})

/**
 * A lasting effect on one or more PCs, NPCs, or beasts: a curse, a card's boon, a bargain, a transformation.
 * The effect owns its rules; events reference it instead of restating them. Whether it is active,
 * ended, or expired is derived from `began`, `ended`, and `duration`.
 */
export const Effect = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1).describe('The canonical name, e.g. `Vessel`'),
    icon: z.string().describe('Icon-catalog id, e.g. `gi/GiLightningStorm`'),
    on: z
      .array(z.union([entityRefOf('pc'), entityRefOf('npc'), entityRefOf('beast')]))
      .min(1)
      .refine(
        (bearers) => new Set(bearers.map((ref) => `${ref.ref}:${ref.key}`)).size === bearers.length,
        'Each bearer is listed once',
      )
      .describe('Everyone who carries the effect'),
    cause: z
      .union([
        entityRefOf('item'),
        entityRefOf('npc'),
        entityRefOf('location'),
        entityRefOf('card'),
      ])
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
