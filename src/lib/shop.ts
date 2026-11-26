import type { EntityRef } from '#/definitions/kind'
import type { ITEM_CATEGORIES, ITEM_RARITIES } from '#/definitions/library'
import type { Price } from '#/definitions/price'
import type { ShopType, StockLine } from '#/definitions/shop'

type Rarity = (typeof ITEM_RARITIES)[number]
type Category = (typeof ITEM_CATEGORIES)[number]

/** What the roller needs to know about a magic item it may put on a shelf. */
export type StockCandidate = {
  item: EntityRef<'magicItem'>
  name: string
  rarity: Rarity
  category: Category
}

/**
 * Dungeon Master's Guide (2024) prices by rarity. A consumable (potion, scroll, ammunition) costs
 * half. Artifacts and items of varying rarity have no market price.
 */
const RARITY_PRICES: Partial<Record<Rarity, number>> = {
  common: 100,
  uncommon: 400,
  rare: 4000,
  'very rare': 40000,
  legendary: 200000,
}

const CONSUMABLES: ReadonlySet<Category> = new Set(['Potion', 'Scroll', 'Ammunition'])

/** The market price of a magic item, or undefined when it has none. */
export function magicItemPrice({
  rarity,
  category,
}: Pick<StockCandidate, 'rarity' | 'category'>): Price | undefined {
  const gp = RARITY_PRICES[rarity]
  if (gp === undefined) return undefined
  return { amount: CONSUMABLES.has(category) ? gp / 2 : gp, coin: 'gp' }
}

export const SETTLEMENT_SIZES = ['village', 'town', 'city'] as const

export type SettlementSize = (typeof SETTLEMENT_SIZES)[number]

export const SETTLEMENT_SIZE_LABELS: Record<SettlementSize, string> = {
  village: 'Village',
  town: 'Town',
  city: 'City',
}

/** Which magic items a shop type sells, and how many lines it rolls. */
type MagicShelf = { categories?: readonly Category[]; lines: number; rarityScale?: number }

const MAGIC_SHELVES: Partial<Record<ShopType, MagicShelf>> = {
  emporium: { lines: 8 },
  'oddities-dealer': { categories: ['Wondrous Item', 'Ring', 'Rod'], lines: 6 },
  artificer: { categories: ['Wand', 'Rod', 'Staff', 'Wondrous Item'], lines: 5 },
  alchemist: { categories: ['Potion'], lines: 6 },
  herbalist: { categories: ['Potion'], lines: 3, rarityScale: 0.5 },
  blacksmith: { categories: ['Weapon', 'Armor', 'Shield', 'Ammunition'], lines: 3 },
  scribe: { categories: ['Scroll'], lines: 4 },
  bookseller: { categories: ['Scroll'], lines: 2 },
  jeweler: { categories: ['Ring'], lines: 2 },
  'gem-merchant': { categories: ['Ring'], lines: 1 },
  pawnbroker: { lines: 3, rarityScale: 0.5 },
}

/** Whether rolling a shop of this type can draw magic items at all. */
export const rollsMagicItems = (type: ShopType) => MAGIC_SHELVES[type] !== undefined

/**
 * How likely each rarity is on a shelf in a settlement of that size, before the shop's own scale.
 * Very rare items turn up only in cities; legendary items are never simply for sale.
 */
const RARITY_WEIGHTS: Record<SettlementSize, Partial<Record<Rarity, number>>> = {
  village: { common: 8, uncommon: 2 },
  town: { common: 6, uncommon: 4, rare: 1 },
  city: { common: 5, uncommon: 5, rare: 2, 'very rare': 0.5 },
}

const SIZE_LINES: Record<SettlementSize, number> = { village: 0.5, town: 1, city: 1.5 }

/** A seeded random source in [0, 1), so a roll can be repeated in tests. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** How many of a rolled item are on the shelf: one of anything rare, a few common consumables. */
function rolledQuantity(rarity: Rarity, category: Category, random: () => number) {
  if (rarity !== 'common') return 1
  return CONSUMABLES.has(category) ? 1 + Math.floor(random() * 4) : 1
}

/**
 * A random, sensible selection of magic items for a shop: the shop's categories, rarities that
 * fit the settlement, no repeats. The DM edits the result before saving it.
 */
export function rollMagicStock({
  type,
  size,
  candidates,
  random,
}: {
  type: ShopType
  size: SettlementSize
  candidates: readonly StockCandidate[]
  random: () => number
}): StockLine[] {
  const shelf = MAGIC_SHELVES[type]
  if (!shelf) return []
  const scale = shelf.rarityScale ?? 1
  const weights = RARITY_WEIGHTS[size]
  const weightOf = ({ rarity }: StockCandidate) => {
    const weight = weights[rarity] ?? 0
    return rarity === 'common' ? weight : weight * scale
  }
  const pool = candidates.filter(
    (candidate) =>
      (!shelf.categories || shelf.categories.includes(candidate.category)) &&
      magicItemPrice(candidate) !== undefined &&
      weightOf(candidate) > 0,
  )
  const lines = Math.max(1, Math.round(shelf.lines * SIZE_LINES[size]))
  const picked: StockLine[] = []
  while (picked.length < lines && pool.length > 0) {
    const total = pool.reduce((sum, candidate) => sum + weightOf(candidate), 0)
    let roll = random() * total
    const index = pool.findIndex((candidate) => (roll -= weightOf(candidate)) < 0)
    const [candidate] = pool.splice(index === -1 ? pool.length - 1 : index, 1)
    if (!candidate) break
    const quantity = rolledQuantity(candidate.rarity, candidate.category, random)
    picked.push({ item: candidate.item, quantity })
  }
  return picked
}

const COIN_IN_CP = { cp: 1, sp: 10, ep: 50, gp: 100, pp: 1000 } as const

/** A price as the table says it, e.g. `35 gp` or `2,000 gp`. */
export const formatPrice = ({ amount, coin }: Price) => `${amount.toLocaleString('en')} ${coin}`

/** A price in copper, for sorting a shop's stock. */
export const priceInCopper = ({ amount, coin }: Price) => amount * COIN_IN_CP[coin]
