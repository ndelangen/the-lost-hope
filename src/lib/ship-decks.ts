import itemRecords from '#/data/items/_index'
import locationRecords from '#/data/locations/_index'
import type { ShipHull } from '#/definitions/item'
import type { LocationDeck } from '#/definitions/location'

/** A deck map of a vessel, ready to draw damage on: the vessel's hull and its outlines on the map. */
export type ShipDeckMap = {
  vesselKey: string
  vesselName: string
  hull: ShipHull
  /** One outline per sector, in the hull's order: port bow to stern, then starboard. */
  areas: LocationDeck['port']
}

/** The vessel's hull, when the item is a vessel with one. */
export function vesselHull(key: string): { name: string; hull: ShipHull } | undefined {
  const item = Object.hasOwn(itemRecords, key)
    ? itemRecords[key as keyof typeof itemRecords]
    : undefined
  return item && 'hull' in item && item.hull ? { name: item.name, hull: item.hull } : undefined
}

/** The deck a location's map shows, when its map is a deck of a vessel with a matching hull. */
export function shipDeckMap(locationKey: string): ShipDeckMap | undefined {
  const location = Object.hasOwn(locationRecords, locationKey)
    ? locationRecords[locationKey as keyof typeof locationRecords]
    : undefined
  const deck = location && 'deck' in location ? location.deck : undefined
  if (!deck) return undefined
  const vessel = vesselHull(deck.vessel.key)
  if (
    !vessel ||
    vessel.hull.port.length !== deck.port.length ||
    vessel.hull.starboard.length !== deck.starboard.length
  ) {
    return undefined
  }
  return {
    vesselKey: deck.vessel.key,
    vesselName: vessel.name,
    hull: vessel.hull,
    areas: [...deck.port, ...deck.starboard],
  }
}

/** Every location whose deck outlines do not match its vessel's hull, for the data tests. */
export function mismatchedDecks(): string[] {
  return Object.entries(locationRecords)
    .filter(([key, location]) => 'deck' in location && location.deck && !shipDeckMap(key))
    .map(([key]) => key)
}
