import { describe, expect, it } from 'vitest'

import type { Item } from '#/definitions/item'
import type { EntityRef } from '#/definitions/kind'

import { fleetOwners, fleetRoster, lastSeenAt, markersAboard, vesselAt } from './fleet-roster'

const navy: EntityRef = { ref: 'organization', key: 'navy' }
const rebels: EntityRef = { ref: 'organization', key: 'rebels' }

function ship(name: string, extra: Partial<Item> = {}): Item {
  return {
    name,
    slug: name.toLowerCase(),
    icon: `gi/${name}`,
    currentOwner: navy,
    carriedBy: null,
    craftedBy: null,
    vessel: 'battle-cruiser',
    ...extra,
  } as Item
}

const names: Record<string, { name: string; icon?: string }> = {
  navy: { name: 'Navy', icon: 'gi/GiAnchor' },
  rebels: { name: 'Rebels' },
}
const resolve = (ref: EntityRef) => names[ref.key]

describe('fleetRoster', () => {
  const items = {
    flagship: ship('Flagship'),
    wreck: ship('Wreck', { status: 'destroyed' }),
    seized: ship('Seized', { controlledBy: rebels }),
    sunk: ship('Sunk', { controlledBy: rebels, status: 'destroyed' }),
    keel: ship('Keel', { status: 'under-construction' }),
    sword: ship('Sword', { vessel: undefined }),
  }

  it('groups ships by controller, owner first, with losses counted and listed last', () => {
    const roster = fleetRoster('navy', items, resolve)

    expect(roster?.sides.map((side) => [side.name, side.inService, side.lost])).toEqual([
      ['Navy', 1, 1],
      ['Rebels', 1, 1],
    ])
    expect(roster?.sides[0]?.ships.map((entry) => entry.name)).toEqual(['Flagship', 'Wreck'])
    expect(roster?.sides[1]?.ships.map((entry) => entry.name)).toEqual(['Seized', 'Sunk'])
  })

  it('pins tracked people to the ship they were last seen aboard', () => {
    const aboard = new Map([['seized', [{ id: 'party', label: 'The party' }]]])
    const roster = fleetRoster('navy', items, resolve, aboard)

    expect(roster?.sides[1]?.ships[0]?.aboard).toEqual([{ id: 'party', label: 'The party' }])
    expect(roster?.sides[0]?.ships[0]?.aboard).toEqual([])
  })

  it('sets ships under construction apart and ignores items that are not vessels', () => {
    const roster = fleetRoster('navy', items, resolve)

    expect(roster?.building.map((entry) => entry.name)).toEqual(['Keel'])
    expect(
      roster?.sides.flatMap((side) => side.ships).some((entry) => entry.name === 'Sword'),
    ).toBe(false)
  })

  it('offers a roster only to organizations that own more than one vessel', () => {
    expect(fleetOwners(items)).toEqual(['navy'])
    expect(fleetOwners({ only: ship('Only') })).toEqual([])
  })
})

describe('whereabouts', () => {
  const seized = { ref: 'item', key: 'seized' } as const
  const locations = {
    deck: { deck: { vessel: seized } },
    cabin: { parent: { ref: 'location', key: 'deck' } as EntityRef },
    harbour: {},
  }

  it('finds the vessel of a deck, or of a room on it', () => {
    expect(vesselAt('deck', locations)).toBe('seized')
    expect(vesselAt('cabin', locations)).toBe('seized')
    expect(vesselAt('harbour', locations)).toBeUndefined()
  })

  it('groups sightings by vessel and drops those ashore', () => {
    const byShip = markersAboard(
      [
        { id: 'party', label: 'The party', location: 'cabin' },
        { id: 'npc:admiral', label: 'Admiral', location: 'harbour' },
      ],
      locations,
    )
    expect([...byShip]).toEqual([['seized', [{ id: 'party', label: 'The party' }]]])
  })

  it('reads the last sighting from the newest event that names the record', () => {
    const admiral: EntityRef = { ref: 'npc', key: 'admiral' }
    const events = [
      { location: { ref: 'location', key: 'harbour' } as EntityRef, notes: [['Rain.']] },
      { location: { ref: 'location', key: 'deck' } as EntityRef, notes: [[admiral, ' waves.']] },
    ]
    expect(lastSeenAt(admiral, events)).toBe('deck')
    expect(lastSeenAt({ ref: 'npc', key: 'nobody' }, events)).toBeUndefined()
  })
})
