import type { EntityRef } from '#/definitions/kind'

import type { FightGroup, SceneFight } from './dm-encounter'
import type { ShipSectorView } from './ship-damage'

/** A fight as the ship shows it in its room: who is in it and whether it has joined the encounter. */
export type RoomFight = {
  /** The title of its beat. */
  key: string
  opponents: FightGroup[]
  allies: FightGroup[]
  repeats: boolean
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
    repeats: fight.repeats,
    joined: fight.joined,
  }
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
          const here = places.some(
            (place) =>
              place.slice === sector.slice + 1 &&
              (place.side === undefined || place.side === sector.side),
          )
          if (here)
            bySector.set(sector.index, [...(bySector.get(sector.index) ?? []), roomFight(fight)])
        }
      }
      return { deck, name, bySector, deckWide }
    }),
    anywhere: fights
      .filter((fight) => !fight.where.some((place) => known(place.deck.key)))
      .map(roomFight),
  }
}
