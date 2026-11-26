import { z } from 'zod'

export const COINS = ['cp', 'sp', 'ep', 'gp', 'pp'] as const

export type Coin = (typeof COINS)[number]

/** An amount of one coin, e.g. `{ amount: 35, coin: 'gp' }`. */
export const Price = z.strictObject({
  amount: z.number().positive(),
  coin: z.enum(COINS),
})

export type Price = z.infer<typeof Price>

/** What something is worth when that varies, from `min` to `max`, e.g. a sack of 1 to 20 pearls. */
export const PriceRange = z
  .strictObject({ min: Price, max: Price })
  .describe('The lowest and highest it is worth')

export type PriceRange = z.infer<typeof PriceRange>
