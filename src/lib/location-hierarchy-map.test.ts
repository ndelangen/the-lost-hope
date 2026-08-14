import { describe, expect, it } from 'vitest'

import { allEntities, locationChildren, locationParent, locations } from '#/lib/campaign'
import { buildLocationHierarchyMap, coordinatesWithinMap } from '#/lib/location-hierarchy-map'

describe('buildLocationHierarchyMap', () => {
  it('uses local coordinates literally and highlights the current location', () => {
    const siblings = locationChildren(locations.sky_islands.slug)
    const model = buildLocationHierarchyMap(locations.sky_islands, siblings, locations.nimbus.slug)

    expect(model.points.find((point) => point.slug === locations.nimbus.slug)).toMatchObject({
      left: 0,
      top: 0,
      current: true,
    })
    expect(model.points.find((point) => point.slug === locations.skynet.slug)).toMatchObject({
      left: 0,
      top: 0,
      current: false,
    })
  })

  it('preserves coincident child positions instead of spreading them', () => {
    const children = locationChildren(locations.nimbus.slug)
    const model = buildLocationHierarchyMap(locations.nimbus, children)

    expect(model.points).toHaveLength(children.length)
    expect(new Set(model.points.map((point) => `${point.left},${point.top}`))).toEqual(
      new Set(['0,0']),
    )
  })
})

describe('location map coordinates', () => {
  it('keeps every child within its parent map bounds', () => {
    for (const entity of allEntities('location')) {
      const parent = locationParent(entity.data)
      if (!parent || !('at' in entity.data) || !entity.data.at) continue

      expect(
        coordinatesWithinMap(entity.data.at, parent.map),
        `${entity.data.name} should fit within ${parent.name}`,
      ).toBe(true)
    }
  })
})
