import { expect, test } from 'vitest'

import { browseLibrary, getLibraryEntry, librarySearch } from './published-library'

test('player browse, search, and direct entry share the same visibility rules', () => {
  expect(browseLibrary(false).map(({ slug }) => slug)).not.toContain('the-split-trail')
  expect(browseLibrary(false, 'Pack Tactics')).toEqual([])
  expect(getLibraryEntry('ideas', 'the-split-trail', false)).toBeUndefined()
  expect(getLibraryEntry('beasts', 'wolf', false)?.sections).toEqual([])
})

test('DM search finds hidden text and the selected printing controls the mechanics', () => {
  expect(browseLibrary(true, 'Pack Tactics').map(({ slug }) => slug)).toEqual(['wolf'])
  expect(getLibraryEntry('ideas', 'the-split-trail', true)?.sections).toHaveLength(1)
  expect(getLibraryEntry('beasts', 'wolf', true, 'srd-5-2-1')?.sections[0]?.lines[0]).toContain(
    'AC 12',
  )
  expect(getLibraryEntry('monsters', 'wolf', true)).toBeUndefined()
  expect(getLibraryEntry('beasts', 'wolf', true, 'unknown')).toBeUndefined()
})

test('bare dm is a URL opt-in', () => {
  expect(librarySearch({ dm: '' }).dm).toBe(true)
  expect(librarySearch({ dm: false }).dm).toBeUndefined()
  expect(librarySearch({}).dm).toBeUndefined()
})
