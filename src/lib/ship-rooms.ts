import type { ShipHull } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'
import type { FightPlace } from '#/definitions/scene'

import type { FightGroup, SceneFight } from './dm-encounter'

/** The vessel a scene is fought aboard, with its layout. */
export type ShipAboard = {
  vessel: EntityRef<'item'>
  name: string
  hull: ShipHull
}

export type ShipSide = 'port' | 'starboard'

/** One room of the vessel's layout, where the board shows it. */
export type ShipSectorView = {
  /** Its place in the hull: port from bow to stern, then starboard. */
  index: number
  name: string
  side: ShipSide
  /** Position from bow to stern, from 0. */
  slice: number
  escapePods: boolean
}

/** How many slices the ship has from bow to stern. */
export function sliceCount(hull: ShipHull) {
  return hull.port.length
}

/** Every sector of the hull: port from bow to stern, then starboard. */
export function shipSectors(hull: ShipHull): ShipSectorView[] {
  return (['port', 'starboard'] as const).flatMap((side, row) =>
    hull[side].map((sector, slice) => ({
      index: row * hull.port.length + slice,
      name: sector.name,
      side,
      slice,
      escapePods: sector.escapePods,
    })),
  )
}

/** A fight as the ship shows it in its room: who is in it and whether it has joined the encounter. */
export type RoomFight = {
  /** The title of its beat. */
  key: string
  opponents: FightGroup[]
  allies: FightGroup[]
  /** How many times it was brought into the encounter. */
  joined: number
}

/** One deck of the vessel with the fights in its rooms. */
export type DeckRooms = {
  deck: EntityRef<'location'>
  name: string
  /** The fights in each sector, by the sector's index in the hull. */
  bySector: ReadonlyMap<number, RoomFight[]>
  /** Fights that can happen anywhere on this deck. */
  deckWide: RoomFight[]
  /** The sectors the party has already fought through, by their index in the hull. */
  cleared: ReadonlySet<number>
}

/** A vessel's decks with the scene's fights placed in their rooms. */
export type ShipRooms = {
  decks: DeckRooms[]
  /** Fights that are not tied to a room. */
  anywhere: RoomFight[]
}

export type Deck = { deck: EntityRef<'location'>; name: string }

function roomFight(fight: SceneFight & { joined: number }): RoomFight {
  return {
    key: fight.key,
    opponents: fight.opponents,
    allies: fight.allies,
    joined: fight.joined,
  }
}

/** Whether a place on a deck takes in a sector: its slice, on one side or both. */
function placeHolds(place: FightPlace, sector: ShipSectorView) {
  return (
    place.slice === sector.slice + 1 && (place.side === undefined || place.side === sector.side)
  )
}

/**
 * Place a scene's fights on the decks of its vessel. A fight goes into every sector its places
 * name: one side of a slice, both sides when no side is given, or the whole deck without a slice.
 * A fight with no place, or one on a deck the vessel does not have, can happen anywhere.
 */
export function shipRooms(
  sectors: readonly ShipSectorView[],
  decks: readonly Deck[],
  fights: readonly (SceneFight & { joined: number })[],
  cleared: readonly FightPlace[] = [],
): ShipRooms {
  const known = (key: string) => decks.some(({ deck }) => deck.key === key)
  return {
    decks: decks.map(({ deck, name }) => {
      const bySector = new Map<number, RoomFight[]>()
      const deckWide: RoomFight[] = []
      for (const fight of fights) {
        const places = fight.where.filter((place) => place.deck.key === deck.key)
        if (places.some((place) => place.slice === undefined)) {
          deckWide.push(roomFight(fight))
          continue
        }
        for (const sector of sectors) {
          if (places.some((place) => placeHolds(place, sector)))
            bySector.set(sector.index, [...(bySector.get(sector.index) ?? []), roomFight(fight)])
        }
      }
      const clearedHere = cleared.filter((place) => place.deck.key === deck.key)
      const clearedSectors = new Set(
        sectors
          .filter((sector) =>
            clearedHere.some((place) => place.slice === undefined || placeHolds(place, sector)),
          )
          .map((sector) => sector.index),
      )
      return { deck, name, bySector, deckWide, cleared: clearedSectors }
    }),
    anywhere: fights
      .filter((fight) => !fight.where.some((place) => known(place.deck.key)))
      .map(roomFight),
  }
}
