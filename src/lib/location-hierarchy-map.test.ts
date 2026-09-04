import { describe, expect, it } from 'vitest'

import { allEntities, locationChildren, locationParent, locations } from '#/lib/campaign'
import {
  buildLocationHierarchyMap,
  coordinatesWithinMapInset,
  LOCATION_MAP_MIN_POINT_SEPARATION_RATIO,
  normalizedMapCoordinateDistance,
} from '#/lib/location-hierarchy-map'

describe('buildLocationHierarchyMap', () => {
  it('continues from the passage to the shadow arena', () => {
    const passage = locations.serpent_eclipse_left_door_passage
    const model = buildLocationHierarchyMap(passage, locationChildren(passage.slug))

    expect(model.points).toEqual([
      expect.objectContaining({
        slug: locations.serpent_eclipse_shadow_arena.slug,
        left: 50,
        top: 50,
      }),
    ])
  })

  it('links doors I and II to the passage and maze, leaving door III unlinked', () => {
    const chamber = locations.serpent_eclipse_three_door_chamber
    const model = buildLocationHierarchyMap(chamber, locationChildren(chamber.slug))

    expect(model.points).toHaveLength(2)
    expect(model.points).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          slug: locations.serpent_eclipse_left_door_passage.slug,
          left: (1056 / 1536) * 100,
          top: (725 / 1024) * 100,
        }),
        expect.objectContaining({
          slug: locations.serpent_eclipse_maze.slug,
          left: 50,
          top: (825 / 1024) * 100,
        }),
      ]),
    )
  })

  it('uses local coordinates literally and highlights the current location', () => {
    const siblings = locationChildren(locations.three_sky_kingdoms.slug)
    const model = buildLocationHierarchyMap(
      locations.three_sky_kingdoms,
      siblings,
      locations.nimbus.slug,
    )

    expect(model.points.find((point) => point.slug === locations.nimbus.slug)).toMatchObject({
      current: true,
    })
    expect(model.points.find((point) => point.slug === locations.nimbus.slug)?.left).toBeCloseTo(
      (275 / 1050) * 100,
    )
    expect(model.points.find((point) => point.slug === locations.nimbus.slug)?.top).toBeCloseTo(
      25.71,
      2,
    )
    expect(model.points.find((point) => point.slug === locations.skynet.slug)).toMatchObject({
      left: 50,
      top: 50,
      current: false,
    })
  })

  it('preserves the distinct positions assigned by campaign data', () => {
    const children = locationChildren(locations.nimbus.slug)
    const model = buildLocationHierarchyMap(locations.nimbus, children)

    expect(model.points).toHaveLength(children.length)
    expect(new Set(model.points.map((point) => `${point.left},${point.top}`)).size).toBe(
      children.length,
    )
  })
})

describe('location map coordinates', () => {
  it('keeps every child inset from its parent map edges', () => {
    for (const entity of allEntities('location')) {
      const parent = locationParent(entity.data)
      if (!parent || !('at' in entity.data) || !entity.data.at) continue

      expect(
        coordinatesWithinMapInset(entity.data.at, parent.map),
        `${entity.data.name} should stay inset from the edges of ${parent.name}`,
      ).toBe(true)
    }
  })

  it('keeps sibling map points far enough apart not to overlap', () => {
    for (const parent of allEntities('location')) {
      const children = locationChildren(parent.slug)

      for (const [index, child] of children.entries()) {
        for (const sibling of children.slice(index + 1)) {
          if (!('at' in child.data) || !child.data.at) continue
          if (!('at' in sibling.data) || !sibling.data.at) continue

          expect(
            normalizedMapCoordinateDistance(child.data.at, sibling.data.at, parent.data.map),
            `${child.data.name} and ${sibling.data.name} should not overlap on ${parent.data.name}`,
          ).toBeGreaterThanOrEqual(LOCATION_MAP_MIN_POINT_SEPARATION_RATIO)
        }
      }
    }
  })
})
