import { describe, expect, it } from 'vitest'

import { create as createLocation, LocationConnection } from './location'
import { DEFAULT_LOCATION_ILLUSTRATION } from './media'

describe('Location', () => {
  const portal = {
    id: 'return-portal',
    type: 'portal' as const,
    label: 'Return portal',
    destination: { ref: 'location' as const, key: 'three_door_chamber' },
    at: [525, 350] as [number, number],
  }

  it('supports outgoing connections independently of a parent', () => {
    expect(createLocation({ name: 'Arena', connections: [portal] }).connections).toEqual([portal])
    expect(createLocation({ name: 'Empty' }).connections).toEqual([])
  })

  it('rejects duplicate local connection IDs', () => {
    expect(() => createLocation({ name: 'Arena', connections: [portal, portal] })).toThrow(
      /unique/u,
    )
  })

  it('rejects non-location destinations and invalid connection types', () => {
    expect(
      LocationConnection.safeParse({ ...portal, destination: { ref: 'pc', key: 'jim' } }).success,
    ).toBe(false)
    expect(LocationConnection.safeParse({ ...portal, type: 'telepathy' }).success).toBe(false)
  })

  it.each([
    [-1, 50],
    [1051, 350],
    [525, 701],
    [NaN, 10],
    [Infinity, 10],
  ])('rejects invalid source-map connection coordinates %s, %s', (x, y) => {
    expect(() =>
      createLocation({ name: 'Arena', connections: [{ ...portal, at: [x, y] }] }),
    ).toThrow(/connections/u)
  })

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
