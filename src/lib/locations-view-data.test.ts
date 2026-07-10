import { describe, expect, it } from 'vitest'

import { LOCATION_TYPES } from '#/definitions/location'
import {
  filterLocationDirectory,
  locationDirectoryTree,
  locationMapModel,
  type LocationDirectoryNode,
} from '#/lib/locations-view-data'

const tree: LocationDirectoryNode[] = [
  {
    slug: 'realm',
    name: 'Realm',
    type: 'realm',
    teaser: 'The surrounding country',
    activityCount: 0,
    children: [
      {
        slug: 'hidden-vault',
        name: 'Hidden Vault',
        type: 'dungeon',
        teaser: 'A sealed chamber',
        activityCount: 2,
        children: [],
      },
    ],
  },
]

describe('filterLocationDirectory', () => {
  it('retains ancestors of matching descendants', () => {
    const result = filterLocationDirectory(tree, 'sealed', new Set(LOCATION_TYPES))

    expect(result).toHaveLength(1)
    expect(result[0].children.map((node) => node.slug)).toEqual(['hidden-vault'])
  })

  it('combines type and text filters', () => {
    const result = filterLocationDirectory(tree, 'vault', new Set(['dungeon']))

    expect(result[0].children).toHaveLength(1)
    expect(filterLocationDirectory(tree, 'vault', new Set(['building']))).toEqual([])
  })
})

describe('location view models', () => {
  it('keeps map pins within the canvas', () => {
    const model = locationMapModel(new Set(LOCATION_TYPES))

    expect(model.pins.length).toBeGreaterThan(0)
    expect(model.pins.every((pin) => pin.left >= 0 && pin.left <= 100)).toBe(true)
    expect(model.pins.every((pin) => pin.top >= 0 && pin.top <= 100)).toBe(true)
  })

  it('provides directory display fields without further campaign lookups', () => {
    const nodes = locationDirectoryTree()

    expect(nodes.length).toBeGreaterThan(0)
    expect(nodes.every((node) => typeof node.teaser === 'string')).toBe(true)
    expect(nodes.every((node) => node.activityCount >= 0)).toBe(true)
  })
})
