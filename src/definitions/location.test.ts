import { describe, expect, it } from 'vitest'

import { create as createLocation } from './location'
import { DEFAULT_LOCATION_ILLUSTRATION } from './media'

describe('Location', () => {
  it('defaults omitted artwork to the shared location illustration', () => {
    expect(createLocation({ name: 'Unillustrated place' }).illustration).toBe(
      DEFAULT_LOCATION_ILLUSTRATION,
    )
  })

  it('accepts a self-hosted location illustration', () => {
    const illustration = '/assets/locations/fairhaven.webp'

    expect(createLocation({ name: 'Illustrated place', illustration }).illustration).toBe(
      illustration,
    )
  })

  it.each([
    'https://example.com/fairhaven.png',
    '/assets/pcs/fairhaven.png',
    '/assets/locations/../pcs/fairhaven.png',
    '/assets/locations/fairhaven.avif',
    '/assets/locations/fairhaven.png?version=2',
  ])('rejects an invalid illustration path: %s', (illustration) => {
    expect(() => createLocation({ name: 'Invalid artwork', illustration })).toThrow(
      /Location illustrations must be self-hosted image paths/u,
    )
  })
})
