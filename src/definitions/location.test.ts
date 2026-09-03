import { describe, expect, it } from 'vitest'

import { create as createLocation } from './location'
import { DEFAULT_LOCATION_ILLUSTRATION } from './media'

describe('Location', () => {
  it('uses a 3:2 map canvas by default', () => {
    const { map } = createLocation({ name: 'Unmapped place' })
    expect(map.width / map.height).toBe(1.5)
  })

  it('accepts a 3:2 map at its actual source dimensions', () => {
    const map = { url: '/assets/maps/dungeon.jpg', width: 1536, height: 1024 }
    expect(createLocation({ name: 'Dungeon', map }).map).toEqual(map)
  })

  it.each([
    [1254, 1254],
    [1200, 700],
    [1024, 1536],
    [0, 0],
    [-3, -2],
    [1.5, 1],
  ])('rejects unsupported map dimensions %s by %s', (width, height) => {
    expect(() =>
      createLocation({ name: 'Invalid map', map: { url: '/assets/maps/test.jpg', width, height } }),
    ).toThrow(/map/u)
  })

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
