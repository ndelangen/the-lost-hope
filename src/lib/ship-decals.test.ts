import { describe, expect, it } from 'vitest'

import { compartmentDecals, insidePolygon } from './ship-decals'
import { mismatchedDecks, shipDeckMap } from './ship-decks'

const square = [
  [0, 0],
  [400, 0],
  [400, 200],
  [0, 200],
] as const

describe('ship decals', () => {
  it('draws nothing on an untouched sector', () => {
    const decals = compartmentDecals(square, 0, 1)
    expect([decals.scorches, decals.cracks, decals.embers]).toEqual([[], [], []])
  })

  it('only adds marks as the wear grows, keeping the earlier ones in place', () => {
    const light = compartmentDecals(square, 0.4, 3)
    const heavy = compartmentDecals(square, 1, 3)
    expect(heavy.scorches.slice(0, light.scorches.length)).toEqual(light.scorches)
    expect(heavy.cracks.length).toBeGreaterThan(light.cracks.length)
    expect(heavy.embers.length).toBeGreaterThan(0)
  })

  it('keeps every mark inside the outline', () => {
    const triangle = [
      [0, 0],
      [600, 0],
      [0, 300],
    ] as const
    for (const scorch of compartmentDecals(triangle, 1, 7).scorches) {
      expect(insidePolygon([scorch.x, scorch.y], triangle)).toBe(true)
    }
  })

  it('outlines every sector of Ride the Lightning on both deck maps', () => {
    expect(mismatchedDecks()).toEqual([])
    for (const key of ['ride_the_lightning_main_deck', 'ride_the_lightning_gun_deck']) {
      expect(shipDeckMap(key)?.areas).toHaveLength(8)
    }
  })
})
