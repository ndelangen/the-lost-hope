import { join } from 'node:path'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

import locations from '../src/data/locations/_index'
import { responsiveImageFor } from '../src/lib/public-media'
import { RESPONSIVE_IMAGE_SOURCES } from './image-sources'

const mapSources = RESPONSIVE_IMAGE_SOURCES.filter((source) =>
  Object.values(locations).some((location) => location.map.url === source.logicalSource),
)

describe('location map assets', () => {
  it('uses the same 3:2 ratio for every illustrated and schematic map', () => {
    for (const location of Object.values(locations)) {
      expect(location.map.width / location.map.height).toBe(1.5)
    }
  })

  it.each(mapSources)(
    'matches the source dimensions and delivery variants for $id',
    async (source) => {
      const metadata = await sharp(join(process.cwd(), source.repositoryPath)).metadata()
      expect(metadata.width! / metadata.height!).toBe(1.5)
      expect(metadata.hasAlpha).toBe(false)

      for (const location of Object.values(locations)) {
        if (location.map.url !== source.logicalSource) continue
        expect(location.map.width).toBe(metadata.width)
        expect(location.map.height).toBe(metadata.height)
      }

      const delivery = responsiveImageFor(source.logicalSource)
      expect(delivery).toBeDefined()
      expect(delivery?.width).toBe(metadata.width)
      expect(delivery?.height).toBe(metadata.height)
      await Promise.all(
        delivery!.candidates.map(async (candidate) => {
          const variant = await sharp(join(process.cwd(), 'public', candidate.src)).metadata()
          expect(variant.format).toBe('jpeg')
          expect(variant.isProgressive).toBe(true)
          expect(variant.width).toBe(candidate.width)
          expect(variant.height).toBe(candidate.height)
          expect(Math.abs(candidate.height - candidate.width / 1.5)).toBeLessThanOrEqual(0.5)
        }),
      )
    },
  )
})
