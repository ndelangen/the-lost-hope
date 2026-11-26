import { expect, test } from 'vitest'

import imageSources from '../../scripts/library-image-sources.json'
import { browseLibrary, getLibraryEntry, librarySearch } from './published-library'
import { loadAllLibraryDetails, publishedLibrary } from './published-library-data'

// These tests read printed text across the whole catalog.
await loadAllLibraryDetails()

test('player browse, search, and direct entry share the same visibility rules', () => {
  expect(browseLibrary(false).map(({ type }) => type)).not.toContain('ideas')
  expect(browseLibrary(false, 'wax on the bell', 'ideas')).toEqual([])
  expect(getLibraryEntry('ideas', 'the-bell-was-muffled-between-strikes', false)).toBeUndefined()
  expect(getLibraryEntry('beasts', 'wolf', false)?.sections).toEqual([])
})

test('DM search finds hidden text and the selected printing controls the mechanics', () => {
  expect(browseLibrary(true, 'Pack Tactics', 'beasts').map(({ slug }) => slug)).toContain('wolf')
  // A converted printing is found by its typed abilities.
  expect(browseLibrary(true, 'Web Walker', 'beasts').map(({ slug }) => slug)).toContain(
    'giant-wolf-spider',
  )
  expect(
    getLibraryEntry('ideas', 'the-bell-was-muffled-between-strikes', true)?.sections,
  ).toHaveLength(1)
  expect(
    getLibraryEntry('beasts', 'wolf', true, 'srd-5-2-1')?.selected.typed?.publication.key,
  ).toBe('srd_5_2_1')
  expect(getLibraryEntry('beasts', 'wolf', true, 'srd-5-1')?.selected.typed?.publication.key).toBe(
    'srd_5_1',
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
    [...(entry.art ?? []), ...entry.printings.flatMap(({ art }) => art ?? [])].flatMap(({ file }) =>
      sources.has(file) ? [] : [file],
    ),
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

test('playable species expose traits while NPC hooks stay in the DM view', () => {
  const player = getLibraryEntry('species', 'halfling', false)!
  const dm = getLibraryEntry('species', 'halfling', true)!
  expect(player.sections.map(({ title }) => title)).toContain('Species traits')
  expect(player.sections.map(({ title }) => title)).not.toContain('Original NPC · Pell Reedgate')
  expect(dm.sections.map(({ title }) => title)).toContain('Original NPC · Pell Reedgate')
  expect(browseLibrary(false, 'Pell Reedgate')).toEqual([])
  expect(browseLibrary(true, 'Pell Reedgate').map(({ slug }) => slug)).toContain('halfling')
  expect(getLibraryEntry('npcs', 'tesk-reedmark', false)).toBeUndefined()
  expect(
    getLibraryEntry('npcs', 'tesk-reedmark', true)?.sections.map(({ title }) => title),
  ).toContain('Hook')
})

test('staged printings retain exact editions and their own portraits', () => {
  const index = getLibraryEntry('beasts', 'giant-insect-centipede', true)!
  const srd = getLibraryEntry('beasts', 'giant-insect-centipede', true, 'srd-5-2-1')!
  const otherId = index.printings.find(({ id }) => id !== 'srd-5-2-1')?.id
  expect(otherId).toBeDefined()
  const other = getLibraryEntry('beasts', 'giant-insect-centipede', true, otherId)!
  expect(srd.selected.label).toBe('SRD 5.2.1')
  expect(other.selected.label).toBe('Player’s Handbook')
  expect(srd.art[0]?.file).not.toBe(other.art[0]?.file)
  expect(getLibraryEntry('beasts', 'giant-insect-centipede', false, otherId)?.sections).toEqual([])
})

test('preserves older beast mechanics as DM content under their own publication', () => {
  const bison = getLibraryEntry('beasts', 'bison', true)!
  expect(bison.selected.edition).toBe('3.5 edition')
  expect(bison.selected.label).toBe('Revised v3.5 SRD (Monsters)')
  expect(bison.sections.map(({ title }) => title)).toContain('Full attack')
  expect(getLibraryEntry('beasts', 'bison', false)?.sections).toEqual([])
})

test('keeps an existing default portrait ahead of its staged alternates', () => {
  const wolf = getLibraryEntry('beasts', 'wolf', true, 'srd-5-1')!
  const result = browseLibrary(false, 'wolf', 'beasts').find(({ slug }) => slug === 'wolf')
  expect(wolf.art[0]?.file).toBe('/assets/library/beasts/wolf.png')
  expect(result?.art?.file).toBe(wolf.art[0]?.file)
  expect(new Set(wolf.art.map(({ file }) => file)).size).toBe(wolf.art.length)
})

test('uses the existing fifth-edition glossary for compatible staged printings', () => {
  const bear = getLibraryEntry('beasts', 'bear-mcdm', true)!
  expect(bear.selected.edition).toBe('2014 fifth edition compatible')
  expect(bear.selected.glossary).toBe('srd-5-1')
})

test('retains incomplete printings with their status, hold notes, and existing art', () => {
  const dm = getLibraryEntry('beasts', 'ghamoo-ra', true)!
  expect(dm.selected.status).toBe('Incomplete')
  expect(dm.sections.map(({ title }) => title)).toContain('Source hold')
  expect(dm.art.length).toBeGreaterThan(0)
  const player = getLibraryEntry('beasts', 'ghamoo-ra', false)!
  expect(player.selected.status).toBeUndefined()
  expect(player.sections).toEqual([])
})
