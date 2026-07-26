import { describe, expect, it } from 'vitest'

import { create as createItem } from './item'

describe('Item', () => {
  it('represents unknown ownership and carrying explicitly', () => {
    const item = createItem({
      name: 'Unclaimed Relic',
      icon: 'gi/GiRock',
      currentOwner: null,
      carriedBy: null,
      craftedBy: null,
    })

    expect(item.currentOwner).toBeNull()
    expect(item.carriedBy).toBeNull()
    expect(item.craftedBy).toBeNull()
  })
})
