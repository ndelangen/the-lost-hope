import { describe, expect, it } from 'vitest'

import { Shop } from '#/definitions/shop'

import {
  magicItemPrice,
  rollMagicStock,
  rerollStock,
  rollStock,
  searchStockItems,
  seededRandom,
  isSoldOut,
  stepQuantity,
  stockShelves,
  withQuantity,
  withShopPrice,
  type StockCandidate,
} from './shop'

const candidate = (
  key: string,
  rarity: StockCandidate['rarity'],
  category: StockCandidate['category'],
): StockCandidate => ({ item: { ref: 'magicItem', key }, name: key, rarity, category })

const candidates = [
  candidate('healing', 'common', 'Potion'),
  candidate('greater_healing', 'uncommon', 'Potion'),
  candidate('superior_healing', 'rare', 'Potion'),
  candidate('supreme_healing', 'very rare', 'Potion'),
  candidate('flame_tongue', 'rare', 'Weapon'),
  candidate('bag', 'uncommon', 'Wondrous Item'),
  candidate('vorpal', 'legendary', 'Weapon'),
  candidate('wand', 'varies', 'Wand'),
]

describe('magicItemPrice', () => {
  it('prices by rarity, consumables at half', () => {
    expect(magicItemPrice({ rarity: 'rare', category: 'Weapon' })).toEqual({
      amount: 4000,
      coin: 'gp',
    })
    expect(magicItemPrice({ rarity: 'common', category: 'Potion' })).toEqual({
      amount: 50,
      coin: 'gp',
    })
  })

  it('has no price for artifacts or varying rarity', () => {
    expect(magicItemPrice({ rarity: 'artifact', category: 'Wondrous Item' })).toBeUndefined()
    expect(magicItemPrice({ rarity: 'varies', category: 'Wand' })).toBeUndefined()
  })
})

describe('rollMagicStock', () => {
  it('stocks an alchemist with potions only', () => {
    const stock = rollMagicStock({
      type: 'alchemist',
      size: 'city',
      candidates,
      random: seededRandom(1),
    })
    expect(stock.length).toBeGreaterThan(0)
    for (const { item } of stock) expect(item.key).toMatch(/healing/)
  })

  it('never sells very rare items outside cities, or legendary items at all', () => {
    for (let seed = 0; seed < 50; seed++) {
      const keys = rollMagicStock({
        type: 'emporium',
        size: 'town',
        candidates,
        random: seededRandom(seed),
      }).map(({ item }) => item.key)
      expect(keys).not.toContain('supreme_healing')
      expect(keys).not.toContain('vorpal')
      expect(keys).not.toContain('wand')
    }
  })

  it('rolls a stock the shop schema accepts, with no repeats', () => {
    const stock = rollMagicStock({
      type: 'emporium',
      size: 'city',
      candidates,
      random: seededRandom(7),
    })
    expect(Shop.parse({ type: 'emporium', stock }).stock).toEqual(stock)
  })

  it('is the same for the same seed', () => {
    const roll = () =>
      rollMagicStock({ type: 'emporium', size: 'city', candidates, random: seededRandom(3) })
    expect(roll()).toEqual(roll())
  })

  it('rolls nothing for a shop with no magic shelf', () => {
    expect(
      rollMagicStock({ type: 'bakery', size: 'city', candidates, random: seededRandom(1) }),
    ).toEqual([])
  })
})

describe('rollStock', () => {
  const bread = { ref: 'equipment', key: 'bread' } as const
  const tart = { ref: 'equipment', key: 'tart' } as const

  it('stocks a bakery from its assortment, with plenty of each', () => {
    const stock = rollStock({
      type: 'bakery',
      size: 'town',
      assortment: [bread, tart],
      candidates,
      random: seededRandom(2),
    })
    expect(stock).toEqual(expect.arrayContaining([{ item: bread }, { item: tart }]))
    expect(stock).toHaveLength(2)
  })

  it('keeps assortment magic items to what the settlement allows, and never lists one twice', () => {
    for (let seed = 0; seed < 30; seed++) {
      const stock = rollStock({
        type: 'emporium',
        size: 'village',
        assortment: [
          { ref: 'magicItem', key: 'vorpal' },
          { ref: 'magicItem', key: 'healing' },
        ],
        candidates,
        random: seededRandom(seed),
      })
      const keys = stock.map(({ item }) => item.key)
      expect(keys).not.toContain('vorpal')
      expect(new Set(keys).size).toBe(keys.length)
      expect(Shop.parse({ type: 'emporium', stock }).stock).toEqual(stock)
    }
  })
})

const goods = (key: string) => ({ item: { ref: 'equipment' as const, key } })
const magic = (key: string) => ({ item: { ref: 'magicItem' as const, key }, quantity: 1 })

describe('stockShelves', () => {
  it('splits goods from magic items and keeps each in listed order', () => {
    const stock = [magic('wand'), goods('rope'), magic('bag'), goods('acid')]
    expect(stockShelves(stock)).toEqual({
      goods: [goods('rope'), goods('acid')],
      magic: [magic('wand'), magic('bag')],
    })
  })
})

describe('rerollStock', () => {
  it('keeps locked lines and fills each shelf up to the size of the new roll', () => {
    const current = [goods('rope'), goods('acid'), magic('wand')]
    const rolled = [goods('torch'), goods('rope'), goods('tent'), magic('bag'), magic('ring')]
    const next = rerollStock(current, new Set(['equipment:rope', 'magicItem:wand']), rolled)
    expect(next).toEqual([
      goods('rope'),
      goods('torch'),
      goods('tent'),
      magic('wand'),
      magic('bag'),
    ])
  })

  it('is the plain roll when nothing is locked', () => {
    const rolled = [goods('torch'), magic('bag')]
    expect(rerollStock([goods('rope')], new Set(), rolled)).toEqual(rolled)
  })

  it('keeps every locked line even when the roll is smaller', () => {
    const current = [goods('rope'), goods('acid')]
    const locked = new Set(['equipment:rope', 'equipment:acid'])
    expect(rerollStock(current, locked, [goods('torch')])).toEqual(current)
  })
})

describe('quantities', () => {
  it('counts up from plenty, and selling the last one leaves it sold out', () => {
    expect(stepQuantity(undefined, 1)).toBe(1)
    expect(stepQuantity(3, -1)).toBe(2)
    expect(stepQuantity(1, -1)).toBe(0)
    expect(stepQuantity(0, -1)).toBe(0)
    expect(isSoldOut({ quantity: 0 })).toBe(true)
    expect(isSoldOut({})).toBe(false)
  })

  it('stores a whole count, zero for sold out, and plenty otherwise', () => {
    expect(withQuantity(goods('rope'), 4)).toEqual({ ...goods('rope'), quantity: 4 })
    expect(withQuantity(magic('bag'), undefined)).toEqual({ item: magic('bag').item })
    expect(withQuantity(magic('bag'), 0)).toEqual({ item: magic('bag').item, quantity: 0 })
    expect(Shop.parse({ type: 'emporium', stock: [{ ...magic('bag'), quantity: 0 }] })).toBeTruthy()
    expect(withQuantity(magic('bag'), Number.NaN)).toEqual({ item: magic('bag').item })
  })
})

describe('withShopPrice', () => {
  const list = { amount: 50, coin: 'gp' } as const

  it('stores a price that differs from the item’s own', () => {
    expect(withShopPrice(goods('rope'), { amount: 75, coin: 'gp' }, list)).toEqual({
      ...goods('rope'),
      price: { amount: 75, coin: 'gp' },
    })
  })

  it('stores nothing for the same worth in another coin, or for no price', () => {
    const line = { ...goods('rope'), price: { amount: 75, coin: 'gp' as const } }
    expect(withShopPrice(line, { amount: 5, coin: 'pp' }, list)).toEqual(goods('rope'))
    expect(withShopPrice(line, undefined, list)).toEqual(goods('rope'))
  })
})

describe('searchStockItems', () => {
  const entries = [
    { ...goods('healers_kit'), name: 'Healer’s Kit' },
    { ...magic('greater_healing'), name: 'Potion of Greater Healing' },
    { ...magic('healing'), name: 'Potion of Healing' },
    { ...goods('rope'), name: 'Rope' },
  ]

  it('ranks names that start with the search, then words that do, and skips what is in stock', () => {
    const { matches, more } = searchStockItems('heal', entries, [magic('healing')], 5)
    expect(matches.map(({ name }) => name)).toEqual(['Healer’s Kit', 'Potion of Greater Healing'])
    expect(more).toBe(0)
  })

  it('reports how many more matched than fit, and waits for two letters', () => {
    expect(searchStockItems('o', entries, [], 5).matches).toEqual([])
    expect(searchStockItems('po', entries, [], 1)).toMatchObject({ more: 1 })
  })
})
