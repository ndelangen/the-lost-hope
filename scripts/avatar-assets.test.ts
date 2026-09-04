import { existsSync } from 'node:fs'
import { join } from 'node:path'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

import beasts from '../src/data/beasts/_index'
import events from '../src/data/events/_index'
import npcs from '../src/data/npcs/_index'
import pcs from '../src/data/pcs/_index'
import { DEFAULT_AVATAR } from '../src/definitions/media'
import { responsiveImageFor } from '../src/lib/public-media'
import { RESPONSIVE_IMAGE_SOURCES, responsiveImageSourcePath } from './image-sources'

const avatars = [
  ...new Set([
    DEFAULT_AVATAR,
    ...[...Object.values(pcs), ...Object.values(npcs), ...Object.values(beasts)].map(
      (entity) => entity.avatar,
    ),
    ...Object.values(pcs).flatMap((pc) =>
      (pc.previousPortraits ?? []).map((portrait) => portrait.url),
    ),
    ...Object.values(events).flatMap((event) =>
      event.mark.type === 'avatar' ? [event.mark.url] : [],
    ),
  ]),
]

describe('avatar assets', () => {
  it.each(avatars)('keeps the source and delivered avatar square: %s', async (avatar) => {
    const source = responsiveImageSourcePath(process.cwd(), avatar)
    // Unavailable local artwork uses the canonical square placeholder. Remote images must
    // have a local pipeline source so their dimensions can be validated before publishing.
    expect(avatar.startsWith('/') || Boolean(source)).toBe(true)
    const publicPath = join(process.cwd(), 'public', avatar)
    const path =
      source ??
      (existsSync(publicPath) ? publicPath : join(process.cwd(), 'public', DEFAULT_AVATAR))
    const metadata = await sharp(path).metadata()
    expect(metadata.width).toBe(metadata.height)

    const delivery = responsiveImageFor(avatar)
    await Promise.all(
      (delivery?.candidates ?? []).map(async (candidate) => {
        expect(candidate.width).toBe(candidate.height)
        const encoded = await sharp(join(process.cwd(), 'public', candidate.src)).metadata()
        expect(encoded.width).toBe(encoded.height)
      }),
    )
  })

  it.each(RESPONSIVE_IMAGE_SOURCES.filter((source) => avatars.includes(source.logicalSource)))(
    'registers $id as a validated responsive avatar',
    (source) => {
      expect(source.role).toBe('avatar')
      expect(responsiveImageFor(source.logicalSource)).toBeDefined()
    },
  )
})
