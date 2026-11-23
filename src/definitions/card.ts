import { z } from 'zod'

import { Background } from './content'
import { makeCreate } from './create'
import { entityRefOf } from './kind'
import { deriveSlug } from './slug'

export const CARD_SUITS = ['Key', 'Ruin', 'Star', 'Jester', 'Balance'] as const

export type CardSuit = (typeof CARD_SUITS)[number]

export const CARD_TONES = ['good', 'mixed', 'bad'] as const

export type CardTone = (typeof CARD_TONES)[number]

export const CARD_TONE_LABELS: Record<CardTone, string> = {
  good: 'Beneficial',
  mixed: 'Mixed',
  bad: 'Harmful',
}

/**
 * One card of a card-drawing item such as the Deck of Many Things. The card owns its wording as
 * read at the table. Who drew it is owned by the events (`draws`), and lasting results by the
 * effects it caused.
 */
export const Card = deriveSlug(
  z.strictObject({
    name: z.string().trim().min(1).describe('The name printed on the card, e.g. `The Vessel`'),
    deck: entityRefOf('item').describe('The deck the card belongs to'),
    suit: z.enum(CARD_SUITS),
    tone: z.enum(CARD_TONES).describe('Whether the card only helps, only harms, or both'),
    classic: z
      .boolean()
      .describe('One of the 22 cards of the original Deck of Many Things, not a later addition'),
    text: z.string().trim().min(1).describe('The card’s full wording'),
    benefit: z.string().trim().min(1).optional().describe('The upside in a few words'),
    drawback: z.string().trim().min(1).optional().describe('The downside in a few words'),
    extraDraws: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe('How the card changes the number of cards drawn, e.g. `Draw one more card.`'),
    background: Background,
  }),
)

export const create = makeCreate(Card)

export type Card = z.infer<typeof Card>
