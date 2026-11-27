import { describe, expect, it } from 'vitest'

import { loadLibraryLink } from './library-links'

describe('loadLibraryLink', () => {
  it('links equipment to its catalog page', async () => {
    expect(await loadLibraryLink({ ref: 'equipment', key: 'pearl' })).toEqual({
      name: 'Pearl',
      type: 'items',
      slug: 'pearl',
    })
  })

  it('links a magic item to the catalog page whose printing it is', async () => {
    expect(await loadLibraryLink({ ref: 'magicItem', key: 'bag_of_holding' })).toMatchObject({
      name: 'Bag of Holding',
      type: 'items',
    })
  })

  it('links a spell to its own page', async () => {
    expect(await loadLibraryLink({ ref: 'spell', key: 'fireball' })).toEqual({
      name: 'Fireball',
      spell: 'fireball',
    })
  })

  it('finds nothing for an entry the library lacks', async () => {
    expect(await loadLibraryLink({ ref: 'equipment', key: 'no_such_thing' })).toBeUndefined()
  })
})
