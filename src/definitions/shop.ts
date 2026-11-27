import { z } from 'zod'

import { entityRefOf } from './kind'
import { Price } from './price'

/** The kinds of shop, named as the library files its shop goods. */
export const SHOP_TYPES = [
  'general-store',
  'emporium',
  'blacksmith',
  'oddities-dealer',
  'alchemist',
  'stables',
  'herbalist',
  'gem-merchant',
  'tailor',
  'tavern',
  'toolwright',
  'grocer',
  'fishmonger',
  'pawnbroker',
  'shipwright',
  'jeweler',
  'scribe',
  'tattooist',
  'potter',
  'instrument-maker',
  'bookseller',
  'greengrocer',
  'bakery',
  'confectioner',
  'perfumer',
  'butcher',
  'chandler',
  'artificer',
  'mask-maker',
] as const

export type ShopType = (typeof SHOP_TYPES)[number]

export const SHOP_TYPE_LABELS: Record<ShopType, string> = {
  'general-store': 'General store',
  emporium: 'Emporium',
  blacksmith: 'Blacksmith',
  'oddities-dealer': 'Oddities dealer',
  alchemist: 'Alchemist',
  stables: 'Stables',
  herbalist: 'Herbalist',
  'gem-merchant': 'Gem merchant',
  tailor: 'Tailor',
  tavern: 'Tavern',
  toolwright: 'Toolwright',
  grocer: 'Grocer',
  fishmonger: 'Fishmonger',
  pawnbroker: 'Pawnbroker',
  shipwright: 'Shipwright',
  jeweler: 'Jeweler',
  scribe: 'Scribe',
  tattooist: 'Tattooist',
  potter: 'Potter',
  'instrument-maker': 'Instrument maker',
  bookseller: 'Bookseller',
  greengrocer: 'Greengrocer',
  bakery: 'Bakery',
  confectioner: 'Confectioner',
  perfumer: 'Perfumer',
  butcher: 'Butcher',
  chandler: 'Chandler',
  artificer: 'Artificer',
  'mask-maker': 'Mask maker',
}

/**
 * What a stock line sells: an item type from the library, magic or plain. A campaign item is one
 * unique object with its own owner, so it is never stock.
 */
export const StockItem = z.union([entityRefOf('magicItem'), entityRefOf('equipment')])

export type StockItem = z.infer<typeof StockItem>

export const StockLine = z.strictObject({
  item: StockItem,
  quantity: z
    .number()
    .int()
    .nonnegative()
    .optional()
    .describe('How many are on the shelf: 0 when sold out, left out when the shop has plenty'),
  price: Price.optional().describe(
    'What this shop asks, only when it differs from the price derived from the item',
  ),
})

export type StockLine = z.infer<typeof StockLine>

/** A location that sells things: what kind of shop, who runs it, and what is on its shelves. */
export const Shop = z
  .strictObject({
    type: z.enum(SHOP_TYPES),
    keeper: entityRefOf('npc').optional().describe('Who runs the shop, when known'),
    stock: z.array(StockLine).describe('What is for sale, in the order the DM lists it'),
  })
  .refine(
    ({ stock }) =>
      new Set(stock.map(({ item }) => `${item.ref}:${item.key}`)).size === stock.length,
    { message: 'Each item appears once in a shop’s stock; use its quantity instead' },
  )

export type Shop = z.infer<typeof Shop>

/** What each kind of shop typically sells: the pool its stock is rolled from. */
export const ShopAssortments = z.record(z.enum(SHOP_TYPES), z.array(StockItem).min(1))

export type ShopAssortments = z.infer<typeof ShopAssortments>

export const createShopAssortments = (input: z.input<typeof ShopAssortments>) =>
  ShopAssortments.parse(input)
