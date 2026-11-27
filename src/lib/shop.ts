import type { EntityRef } from '#/definitions/kind'
import type { Equipment, ITEM_CATEGORIES, ITEM_RARITIES, MagicItem } from '#/definitions/library'
import type { Price } from '#/definitions/price'
import type { Shop, ShopType, StockItem, StockLine } from '#/definitions/shop'

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
  emporium: { lines: 5 },
  'oddities-dealer': { categories: ['Wondrous Item', 'Ring', 'Rod'], lines: 3 },
  artificer: { categories: ['Wand', 'Rod', 'Staff', 'Wondrous Item'], lines: 5 },
  alchemist: { categories: ['Potion'], lines: 3 },
  herbalist: { categories: ['Potion'], lines: 2, rarityScale: 0.5 },
  blacksmith: { categories: ['Weapon', 'Armor', 'Shield', 'Ammunition'], lines: 3 },
  scribe: { categories: ['Scroll'], lines: 4 },
  bookseller: { categories: ['Scroll'], lines: 2 },
  jeweler: { categories: ['Ring'], lines: 2 },
  'gem-merchant': { categories: ['Ring'], lines: 1 },
  pawnbroker: { lines: 3, rarityScale: 0.5 },
}

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

/** How many goods a shop puts out from its assortment, before the settlement's size. */
const GOODS_LINES = 6

/**
 * A shop's rolled stock: a handful of goods from what its kind typically sells, then magic items
 * for a shop with a magic shelf. Magic items from the assortment follow the same rarity limits as
 * the shelf, and nothing is listed twice.
 */
export function rollStock({
  type,
  size,
  assortment,
  candidates,
  random,
}: {
  type: ShopType
  size: SettlementSize
  assortment: readonly StockItem[]
  candidates: readonly StockCandidate[]
  random: () => number
}): StockLine[] {
  const magic = new Map(candidates.map((candidate) => [candidate.item.key, candidate]))
  const allowed = RARITY_WEIGHTS[size]
  const pool = assortment.filter((item) => {
    if (item.ref !== 'magicItem') return true
    const candidate = magic.get(item.key)
    return !!candidate && (allowed[candidate.rarity] ?? 0) > 0 && !!magicItemPrice(candidate)
  })
  const goods: StockLine[] = []
  const wanted = Math.max(1, Math.round(GOODS_LINES * SIZE_LINES[size]))
  while (goods.length < wanted && pool.length > 0) {
    const [item] = pool.splice(Math.floor(random() * pool.length), 1)
    if (!item) break
    goods.push(item.ref === 'magicItem' ? { item, quantity: 1 } : { item })
  }
  const listed = new Set(goods.map(({ item }) => `${item.ref}:${item.key}`))
  const shelf = rollMagicStock({
    type,
    size,
    candidates: candidates.filter(({ item }) => !listed.has(`magicItem:${item.key}`)),
    random,
  })
  return [...goods, ...shelf]
}

const COIN_IN_CP = { cp: 1, sp: 10, ep: 50, gp: 100, pp: 1000 } as const

/** A price as the table says it, e.g. `35 gp` or `2,000 gp`. */
export const formatPrice = ({ amount, coin }: Price) => `${amount.toLocaleString('en')} ${coin}`

/** A price in copper, for sorting a shop's stock. */
export const priceInCopper = ({ amount, coin }: Price) => amount * COIN_IN_CP[coin]

/** A stock line as the shop table shows it. */
export type StockLineView = {
  name: string
  /** The item's library picture, as a logical image source. */
  picture?: string
  category?: string
  rarity?: string
  price?: Price
  /** What the item costs anywhere else: its printed, estimated or market price. */
  listPrice?: Price
  /** Why the price is what it is, when that is not the item's own printed or market price. */
  priceNote?: 'set by the shop' | 'estimate'
}

/** What the table shows for a line, from the loaded library records (missing while loading). */
export function describeStockLine(
  line: StockLine,
  library: {
    magicItems?: ReadonlyMap<string, MagicItem>
    equipment?: ReadonlyMap<string, Equipment>
    /** Library pictures by item, keyed by `stockLineKey`. */
    pictures?: ReadonlyMap<string, string>
  },
  names: {
    magicItem: Readonly<Record<string, string>>
    equipment: Readonly<Record<string, string>>
  },
): StockLineView {
  const name = names[line.item.ref][line.item.key] ?? line.item.key
  const picture = library.pictures?.get(stockLineKey(line))
  if (line.item.ref === 'magicItem') {
    const item = library.magicItems?.get(line.item.key)
    const market = item ? magicItemPrice(item) : undefined
    return {
      name,
      picture,
      category: item?.category,
      rarity: item?.rarity,
      price: line.price ?? market,
      listPrice: market,
      priceNote: line.price ? 'set by the shop' : undefined,
    }
  }
  const item = library.equipment?.get(line.item.key)
  return {
    name,
    picture,
    category: item?.category,
    price: line.price ?? item?.price,
    listPrice: item?.price,
    priceNote: line.price ? 'set by the shop' : item?.priceEstimated ? 'estimate' : undefined,
  }
}

/** What identifies a stock line within a shop: the item it sells. */
export const stockLineKey = ({ item }: Pick<StockLine, 'item'>) => `${item.ref}:${item.key}`

/** A shop with its fields in schema order, so the data file reads the same way every time. */
export const orderedShop = ({ type, keeper, stock }: Shop): Shop => ({
  type,
  ...(keeper ? { keeper } : {}),
  stock: stock.map(({ item, quantity, price }) => ({
    item,
    ...(quantity !== undefined ? { quantity } : {}),
    ...(price ? { price } : {}),
  })),
})

/** Whether two shops would be written to the data file identically. */
export const sameShop = (a: Shop | undefined, b: Shop | undefined) =>
  JSON.stringify(a && orderedShop(a)) === JSON.stringify(b && orderedShop(b))

/** A shop's stock as its two shelves, each in the order the DM lists it. */
export function stockShelves(stock: readonly StockLine[]): {
  goods: StockLine[]
  magic: StockLine[]
} {
  return {
    goods: stock.filter(({ item }) => item.ref === 'equipment'),
    magic: stock.filter(({ item }) => item.ref === 'magicItem'),
  }
}

/**
 * A fresh roll that keeps the lines the DM locked. Each shelf keeps its locked lines first, then
 * takes newly rolled ones until it is as long as the roll made it, so a re-roll does not grow the
 * shop.
 */
export function rerollStock(
  current: readonly StockLine[],
  locked: ReadonlySet<string>,
  rolled: readonly StockLine[],
): StockLine[] {
  const kept = stockShelves(current.filter((line) => locked.has(stockLineKey(line))))
  const fresh = stockShelves(rolled.filter((line) => !locked.has(stockLineKey(line))))
  const sizes = stockShelves(rolled)
  const shelf = (name: 'goods' | 'magic') => [
    ...kept[name],
    ...fresh[name].slice(0, Math.max(0, sizes[name].length - kept[name].length)),
  ]
  return [...shelf('goods'), ...shelf('magic')]
}

/** One more or one fewer on the shelf. Counting starts at one; selling the last one leaves it sold out. */
export function stepQuantity(quantity: number | undefined, delta: 1 | -1): number {
  return Math.max(0, (quantity ?? 0) + delta)
}

/** Whether the shop has sold the last one: the line stays, marked sold out. */
export const isSoldOut = ({ quantity }: Pick<StockLine, 'quantity'>) => quantity === 0

/** The line with that many on the shelf (0 is sold out), or plenty when the count is not a whole number. */
export function withQuantity(line: StockLine, quantity: number | undefined): StockLine {
  const { quantity: _, ...rest } = line
  return quantity !== undefined && Number.isInteger(quantity) && quantity >= 0
    ? { ...rest, quantity }
    : rest
}

/**
 * The line at the price this shop asks. A price equal to the item's own is not a deviation, so it
 * is not stored.
 */
export function withShopPrice(
  line: StockLine,
  price: Price | undefined,
  listPrice: Price | undefined,
): StockLine {
  const { price: _, ...rest } = line
  if (!price || !(price.amount > 0)) return rest
  if (listPrice && priceInCopper(listPrice) === priceInCopper(price)) return rest
  return { ...rest, price }
}

/**
 * Items matching a search, best first: names that start with the words, then names with a word
 * that starts with them, then any other name containing them. Items already in stock are left out.
 */
export function searchStockItems<Entry extends { item: StockItem; name: string }>(
  query: string,
  entries: readonly Entry[],
  stock: readonly StockLine[],
  limit: number,
): { matches: Entry[]; more: number } {
  const words = query.trim().toLowerCase()
  if (words.length < 2) return { matches: [], more: 0 }
  const listed = new Set(stock.map(stockLineKey))
  const ranked = entries.flatMap((entry) => {
    if (listed.has(stockLineKey(entry))) return []
    const name = entry.name.toLowerCase()
    const at = name.indexOf(words)
    if (at === -1) return []
    return [{ entry, rank: at === 0 ? 0 : /[\s(-]/.test(name[at - 1]!) ? 1 : 2 }]
  })
  ranked.sort((a, b) => a.rank - b.rank || a.entry.name.localeCompare(b.entry.name))
  return {
    matches: ranked.slice(0, limit).map(({ entry }) => entry),
    more: Math.max(0, ranked.length - limit),
  }
}

/**
 * Each typed item's library picture, keyed like a stock line, from the catalog's item entries: the
 * first picture of the entry whose printing is typed to that magic item or piece of equipment.
 */
export function picturesByItem(
  records: readonly {
    art?: readonly { file: string }[]
    printings: readonly { typed?: object }[]
  }[],
): ReadonlyMap<string, string> {
  const pictures = new Map<string, string>()
  for (const record of records) {
    const file = record.art?.[0]?.file
    if (!file) continue
    for (const printing of record.printings) {
      const typed = printing.typed as
        | { magicItem?: { key: string }; equipment?: { key: string } }
        | undefined
      if (typed?.magicItem) pictures.set(`magicItem:${typed.magicItem.key}`, file)
      if (typed?.equipment) pictures.set(`equipment:${typed.equipment.key}`, file)
    }
  }
  return pictures
}
