import { describe, expect, it } from 'vitest'

import { Shop } from '#/definitions/shop'

import { magicItemPrice, rollMagicStock, seededRandom, type StockCandidate } from './shop'

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
