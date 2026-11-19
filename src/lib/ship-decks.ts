import itemRecords from '#/data/items/_index'
import locationRecords from '#/data/locations/_index'
import type { ShipHull } from '#/definitions/item'

/** The vessel's hull, when the item is a vessel with one. */
export function vesselHull(key: string): { name: string; hull: ShipHull } | undefined {
  const item = Object.hasOwn(itemRecords, key)
    ? itemRecords[key as keyof typeof itemRecords]
    : undefined
  return item && 'hull' in item && item.hull ? { name: item.name, hull: item.hull } : undefined
}

/**
 * The decks of a vessel: every location whose map is one of its decks, in the order of the
 * campaign's locations. A deck is named without the vessel's name in front, as "Main Deck".
 */
export function vesselDecks(
  vesselKey: string,
): { deck: { ref: 'location'; key: string }; name: string }[] {
  const vesselName = vesselHull(vesselKey)?.name
  return Object.entries(locationRecords).flatMap(([key, location]) => {
    const deck = 'deck' in location ? location.deck : undefined
    if (!deck || deck.vessel.key !== vesselKey) return []
    const name =
      vesselName && location.name.startsWith(`${vesselName} `)
        ? location.name.slice(vesselName.length + 1)
        : location.name
    return [{ deck: { ref: 'location' as const, key }, name }]
  })
}
