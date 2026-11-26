import { expect, test } from 'vitest'

import artStyles from '#/data/dm/art-styles'

import { ORIGINAL_IMAGE_SOURCES } from '../../scripts/image-sources'
import { artStyleReferences } from './art-styles'
import { publishedLibrary } from './published-library-data'

const registered = new Map(ORIGINAL_IMAGE_SOURCES.map((source) => [source.logicalSource, source]))

test.each(Object.entries(artStyles))('every %s reference shows registered art', (_key, style) => {
  const pictures = artStyleReferences(style, publishedLibrary)
  const unresolved = style.references.filter((_ref, index) => !pictures[index])
  expect(unresolved).toEqual([])
  for (const picture of pictures) {
    expect(registered.has(picture!.src), `${picture!.name}: ${picture!.src}`).toBe(true)
  }
  const sources = pictures.map((picture) => picture!.src)
  expect(new Set(sources).size, 'a picture is listed twice').toBe(sources.length)
})

test('portraits are square and maps are 3:2', () => {
  const canvases = Object.values(artStyles).map(({ shows, canvas }) => ({
    shows,
    shape:
      canvas.width === canvas.height
        ? 'square'
        : canvas.width * 2 === canvas.height * 3
          ? '3:2'
          : 'other',
  }))
  expect(canvases.filter(({ shows, shape }) => shows === 'avatar' && shape !== 'square')).toEqual(
    [],
  )
  expect(canvases.filter(({ shows, shape }) => shows === 'locationMap' && shape !== '3:2')).toEqual(
    [],
  )
})
