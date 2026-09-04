import { join } from 'node:path'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

import beasts from '../src/data/beasts/_index'
import { refs } from '../src/data/generated/refs'
import locations from '../src/data/locations/_index'
import { responsiveImageFor } from '../src/lib/public-media'
import { responsiveImageSourcePath } from './image-sources'
import { localSocialImagePath } from './social-image-assets'

const illustration = '/assets/locations/serpent-eclipse-flooded-cavern.jpg'
const avatar = '/assets/beasts/serpent-eclipse-lake-serpent.jpg'

describe('serpent cavern artwork', () => {
  it('attaches the art to the existing entities without changing the map or beast home', () => {
    expect(locations.serpent_eclipse_flooded_cavern.illustration).toBe(illustration)
    expect(locations.serpent_eclipse_flooded_cavern.at).toEqual([360, 740])
    expect(locations.serpent_eclipse_flooded_cavern.parent).toEqual(
      refs.locations.serpent_eclipse_maze,
    )
    expect(locations.serpent_eclipse_maze.map.url).toBe('/assets/maps/serpent-eclipse-maze.jpg')
    expect(beasts.serpent_eclipse_lake_serpent.avatar).toBe(avatar)
    expect(beasts.serpent_eclipse_lake_serpent.location).toEqual(
      refs.locations.serpent_eclipse_flooded_cavern,
    )
  })

  it.each([
    [illustration, 16 / 7],
    [avatar, 1],
  ] as const)(
    'delivers opaque progressive artwork at the intended ratio for %s',
    async (source, ratio) => {
      const original = responsiveImageSourcePath(process.cwd(), source)
      expect(original).toBeDefined()
      const metadata = await sharp(original!).metadata()
      expect(metadata.format).toBe('jpeg')
      expect(metadata.isProgressive).toBe(true)
      expect(metadata.chromaSubsampling).toBe('4:4:4')
      expect(metadata.hasAlpha).toBe(false)
      // Raster dimensions round to whole pixels; the wide source is within half a pixel of 16:7.
      expect(Math.abs(metadata.height! - metadata.width! / ratio)).toBeLessThanOrEqual(0.5)

      const delivery = responsiveImageFor(source)
      expect(delivery).toBeDefined()
      expect(delivery!.candidates[0].width).toBe(32)
      await Promise.all(
        delivery!.candidates.map(async (candidate) => {
          const encoded = await sharp(join(process.cwd(), 'public', candidate.src)).metadata()
          expect(encoded.format).toBe('jpeg')
          expect(encoded.isProgressive).toBe(true)
          expect(Math.abs(candidate.height - candidate.width / ratio)).toBeLessThanOrEqual(0.5)
        }),
      )
    },
  )

  it('makes the illustration available to deployment-only social previews', () => {
    expect(
      localSocialImagePath(process.cwd(), {
        path: '/locations/detail/serpent-eclipse-flooded-cavern',
        entity: { kind: 'location', slug: 'serpent-eclipse-flooded-cavern' },
        imageCandidate: illustration,
      }),
    ).toBe(
      join(process.cwd(), 'assets/images/content/locations/serpent-eclipse-flooded-cavern.jpg'),
    )
  })
})
