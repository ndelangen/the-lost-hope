import { expect, test } from 'vitest'

import imageSources from '../../scripts/library-image-sources.json'
import { browseLibrary, getLibraryEntry, librarySearch } from './published-library'
import { publishedLibrary } from './published-library-data'

test('player browse, search, and direct entry share the same visibility rules', () => {
  expect(browseLibrary(false).map(({ type }) => type)).not.toContain('ideas')
  expect(browseLibrary(false, 'wax on the bell', 'ideas')).toEqual([])
  expect(getLibraryEntry('ideas', 'the-bell-was-muffled-between-strikes', false)).toBeUndefined()
  expect(getLibraryEntry('beasts', 'wolf', false)?.sections).toEqual([])
})

test('DM search finds hidden text and the selected printing controls the mechanics', () => {
  expect(browseLibrary(true, 'Pack Tactics', 'beasts').map(({ slug }) => slug)).toContain('wolf')
  expect(
    getLibraryEntry('ideas', 'the-bell-was-muffled-between-strikes', true)?.sections,
  ).toHaveLength(1)
  expect(getLibraryEntry('beasts', 'wolf', true, 'srd-5-2-1')?.sections[0]?.lines).toContain(
    'Armor class · 12',
  )
  expect(getLibraryEntry('beasts', 'wolf', true, 'srd-5-1')?.sections[0]?.lines).toContain(
    'Armor class · 13',
  )
  expect(getLibraryEntry('monsters', 'wolf', true)).toBeUndefined()
  expect(getLibraryEntry('beasts', 'wolf', true, 'unknown')).toBeUndefined()
})

test('name search favors exact matches and stock can be filtered by shop', () => {
  expect(browseLibrary(false, 'torch', 'items')[0]?.slug).toBe('torch')
  expect(browseLibrary(false, 'torch', 'items', 'General store')[0]?.slug).toBe('torch')
  expect(browseLibrary(false, 'torch', 'items', 'Emporium').map(({ slug }) => slug)).not.toContain(
    'torch',
  )
  expect(getLibraryEntry('items', 'torch', false)?.price).toBe('1 cp')
})

test('every published image has a registered original and each entry has a unique printing path', () => {
  const sources = new Set(imageSources.map(({ logicalSource }) => logicalSource))
  const missingImages = publishedLibrary.flatMap((entry) =>
    (entry.art ?? []).flatMap(({ file }) => (sources.has(file) ? [] : [file])),
  )
  const invalidPrintings = publishedLibrary.filter(
    ({ printings }) =>
      printings.length === 0 || printings.length !== new Set(printings.map(({ id }) => id)).size,
  )
  expect(missingImages).toEqual([])
  expect(invalidPrintings).toEqual([])
})

test('bare dm opts in and valid page numbers survive the URL', () => {
  expect(librarySearch({ dm: '' }).dm).toBe(true)
  expect(librarySearch({ dm: false }).dm).toBeUndefined()
  expect(librarySearch({}).dm).toBeUndefined()
  expect(librarySearch({ page: 2 }).page).toBe(2)
  expect(librarySearch({ page: -2 }).page).toBeUndefined()
})
