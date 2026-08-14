import { describe, expect, it } from 'vitest'

import { DEFAULT_AVATAR, DEFAULT_LOCATION_ILLUSTRATION } from '../src/definitions/media'
import { localSocialImagePath } from './social-image-assets'

describe('localSocialImagePath', () => {
  it('reads a responsive source from the repository-owned original', () => {
    expect(
      localSocialImagePath(process.cwd(), {
        path: '/pcs/detail/jim',
        entity: { kind: 'pc', slug: 'jim' },
        imageCandidate: '/assets/pcs/jim.jpg',
      }),
    ).toBe(`${process.cwd()}/assets/images/content/pcs/jim.jpg`)
  })

  it.each([DEFAULT_AVATAR, DEFAULT_LOCATION_ILLUSTRATION])(
    'keeps the placeholder out of social cards: %s',
    (imageCandidate) => {
      expect(
        localSocialImagePath(process.cwd(), {
          path: '/locations/detail/fairhaven',
          entity: { kind: 'location', slug: 'fairhaven' },
          imageCandidate,
        }),
      ).toBeUndefined()
    },
  )

  it('fails generation for an explicitly configured missing location illustration', () => {
    expect(() =>
      localSocialImagePath(process.cwd(), {
        path: '/locations/detail/fairhaven',
        entity: { kind: 'location', slug: 'fairhaven' },
        imageCandidate: '/assets/locations/does-not-exist.png',
      }),
    ).toThrow(
      '/locations/detail/fairhaven references missing location illustration: /assets/locations/does-not-exist.png',
    )
  })

  it('preserves the existing branded fallback for other missing entity images', () => {
    expect(
      localSocialImagePath(process.cwd(), {
        path: '/npcs/detail/example',
        entity: { kind: 'npc', slug: 'example' },
        imageCandidate: '/assets/npcs/does-not-exist.png',
      }),
    ).toBeUndefined()
  })
})
