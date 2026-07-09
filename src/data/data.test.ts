import { describe, expect, it } from 'vitest'

import { locationParent, validateReferences } from '#/lib/campaign.ts'

describe('location import order', () => {
  it('loads world directly', async () => {
    const world = await import('#/data/locations/world.ts')
    expect(world.default.slug).toBe('world')
  })

  it('loads badesh-forest directly', async () => {
    const forest = await import('#/data/locations/badesh-forest.ts')
    const parent = locationParent(forest.default)
    expect(parent?.slug).toBe('world')
  })

  it('loads locations index', async () => {
    const locations = await import('#/data/locations/_index.ts')
    expect(locations.default.world.slug).toBe('world')
  })
})

describe('reference integrity', () => {
  it('has no dangling entity refs', async () => {
    await import('#/data/index.ts')
    const errors = validateReferences()
    expect(errors).toEqual([])
  })
})
