import { z } from 'zod'

export const COINS = ['cp', 'sp', 'ep', 'gp', 'pp'] as const

export type Coin = (typeof COINS)[number]

/** An amount of one coin, e.g. `{ amount: 35, coin: 'gp' }`. */
export const Price = z.strictObject({
  amount: z.number().positive(),
  coin: z.enum(COINS),
})

export type Price = z.infer<typeof Price>
