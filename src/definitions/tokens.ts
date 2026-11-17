import { z } from 'zod'

import { makeCreate } from './create'
import { entityRefOf } from './kind'

/** One player's house-rule tokens (see the campaign's house rules). */
export const TokenHolding = z.strictObject({
  pc: entityRefOf('pc'),
  dm: z.number().int().nonnegative().describe('DM tokens: rewards the player can spend'),
  curse: z
    .number()
    .int()
    .nonnegative()
    .describe('Curse tokens: earned by disastrous choices, lateness, or breaking character'),
})

export type TokenHolding = z.infer<typeof TokenHolding>

/**
 * The DM tokens and curse tokens each player holds right now. A PC who is not listed holds none.
 * The DM dashboard's steppers rewrite this record in local dev; awards and spends are told in
 * session and event prose.
 */
export const Tokens = z.strictObject({
  holdings: z
    .array(TokenHolding)
    .default([])
    .refine(
      (holdings) => new Set(holdings.map(({ pc }) => pc.key)).size === holdings.length,
      'List each PC once',
    ),
})

export const create = makeCreate(Tokens)
export type Tokens = z.infer<typeof Tokens>
