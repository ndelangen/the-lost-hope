import { describe, expect, it } from 'vitest'

import type { FightPlace } from '#/definitions/scene'

import { scenes, sceneShipUnderFire } from './dm-campaign'
import { sceneFights, type SceneFight } from './dm-encounter'
import { initialHullDamage, shipSectors, sliceCount } from './ship-damage'
import { vesselDecks } from './ship-decks'
import { shipRooms } from './ship-rooms'

const hull = {
  sectorHitPoints: 5,
  port: [
    { name: 'Port bow', escapePods: true },
    { name: 'Port stern', escapePods: true },
  ],
  starboard: [
    { name: 'Starboard bow', escapePods: true },
    { name: 'Starboard stern', escapePods: false },
  ],
}
const sectors = shipSectors(hull, initialHullDamage(hull))
const main = { ref: 'location', key: 'main' } as const
const hold = { ref: 'location', key: 'hold' } as const
const decks = [
  { deck: main, name: 'Main Deck' },
  { deck: hold, name: 'Hold' },
]

const fight = (key: string, where: FightPlace[], joined = 0): SceneFight & { joined: number } => ({
  key,
  onlyIf: undefined,
  opponents: [],
  allies: [],
  repeats: false,
  tactics: undefined,
  creatures: [],
  where,
  joined,
})

const names = (rooms: readonly { key: string }[] | undefined) => rooms?.map(({ key }) => key)

describe('shipRooms', () => {
  const rooms = shipRooms(sectors, decks, [
    fight('The bow', [{ deck: main, slice: 1 }]),
    fight('The wheel', [{ deck: main, slice: 2, side: 'starboard' }], 1),
    fight('The cargo', [{ deck: hold }]),
    fight('The stowaway', []),
    fight('The dock', [{ deck: { ref: 'location', key: 'ashore' } }]),
  ])
  const [mainDeck, holdDeck] = rooms.decks

  it('puts a fight on both sides of its slice when no side is given', () => {
    expect(names(mainDeck!.bySector.get(0))).toEqual(['The bow'])
    expect(names(mainDeck!.bySector.get(2))).toEqual(['The bow'])
  })

  it('puts a fight on one side only when its place names the side', () => {
    expect(names(mainDeck!.bySector.get(3))).toEqual(['The wheel'])
    expect(mainDeck!.bySector.get(1)).toBeUndefined()
    expect(mainDeck!.bySector.get(3)![0]!.joined).toBe(1)
  })

  it('keeps a fight without a slice for the whole of its deck, and off the other decks', () => {
    expect(names(holdDeck!.deckWide)).toEqual(['The cargo'])
    expect(holdDeck!.bySector.size).toBe(0)
    expect(mainDeck!.deckWide).toEqual([])
  })

  it('lets a fight with no place on the vessel happen anywhere', () => {
    expect(names(rooms.anywhere)).toEqual(['The stowaway', 'The dock'])
  })
})

describe('fights aboard a ship under fire', () => {
  it('are placed on a deck of that ship, in a slice the hull has', () => {
    const misplaced = Object.entries(scenes).flatMap(([key, scene]) => {
      const ship = sceneShipUnderFire(scene)
      if (!ship) return []
      const deckKeys = new Set(vesselDecks(ship.vessel.key).map(({ deck }) => deck.key))
      return sceneFights(scene).flatMap((placed) =>
        placed.where
          .filter(
            (place) =>
              !deckKeys.has(place.deck.key) ||
              (place.slice !== undefined && place.slice > sliceCount(ship)),
          )
          .map(() => `${key}: ${placed.key}`),
      )
    })
    expect(misplaced).toEqual([])
  })
})
