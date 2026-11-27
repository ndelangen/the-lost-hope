import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/library-refs'

import {
  libraryCheck,
  libraryGet,
  libraryMentionsIn,
  librarySearch,
  librarySheets,
} from './library-knowledge'

describe('library knowledge', () => {
  it('finds catalog entries and spells by name, best match first', () => {
    const found = librarySearch('shambling mound', { limit: 3 })
    expect(found.split('\n')[1]).toContain('Shambling Mound [monsters/shambling-mound]')
    expect(librarySearch('fireball', { type: 'spells' })).toContain('[spells/fireball]')
  })

  it('filters by challenge rating, group, spell level and rarity', () => {
    const undead = librarySearch('', { type: 'monsters', group: 'Undead', crMin: '5', crMax: '5' })
    for (const line of undead.split('\n').filter((row) => row.startsWith('- ')))
      expect(line).toMatch(/Undead.*CR 5\b/u)
    const third = librarySearch('fire', { type: 'spells', spellLevel: 3 })
    expect(third).toContain('Fireball')
    expect(third).not.toContain('Fire Bolt')
    expect(librarySearch('bag of holding', { rarity: 'uncommon' })).toContain(
      '[items/bag-of-holding]',
    )
    expect(librarySearch('bag of holding', { rarity: 'legendary' })).toMatch(/^# 0 library/u)
  })

  it('reads a typed stat block with its derived numbers', () => {
    const aboleth = libraryGet('refs.monsters.aboleth')
    expect(aboleth).toContain('# Aboleth [monsters/aboleth]')
    expect(aboleth).toContain('HP 135 (18d10 + 36)')
    expect(aboleth).toContain('Tentacle: +9, 12 (2d6 + 5) bludgeoning')
    expect(aboleth).toContain('Legendary actions (3 per round)')
  })

  it('reads spells, magic items and catalog printings', () => {
    expect(libraryGet('spell:fireball')).toContain('8d6 Fire damage')
    const bag = libraryGet('magicItem:bag_of_holding')
    expect(bag).toContain('Wondrous Item, uncommon')
    expect(bag).toContain('500 pounds')
    // Catalog entries gain typed printings as the library grows; either way the entry reads.
    const mound = libraryGet('monsters/shambling-mound')
    expect(mound).toContain('# Shambling Mound [monsters/shambling-mound]')
    expect(mound).toMatch(/CR 5|Challenge · 5/u)
  })

  it('lists the choices when a name means several entries', () => {
    const goblin = libraryGet('Goblin')
    expect(goblin).toContain('[species/goblin]')
    expect(goblin).toContain('[monsters/goblin]')
    expect(libraryGet('refs.monsters.no_such_thing')).toContain('No library entry')
  })

  it('finds capitalised library names in an idea, not lowercase words', () => {
    const ids = libraryMentionsIn('A Shambling Mound rises; Ilsa casts Fireball in a light breeze.')
      .map(({ id }) => id)
      .toSorted()
    expect(ids).toEqual(['monsters/shambling-mound', 'spells/fireball'])
    // A run of capitals that names someone else is not a library name inside it.
    expect(libraryMentionsIn('Onana Tempest sends word.').map(({ id }) => id)).toEqual([])
    expect(libraryMentionsIn('The Aboleth waits.').map(({ id }) => id)).toEqual([
      'monsters/aboleth',
    ])
  })

  it('writes short sheets for the entries campaign records point at', () => {
    const sheets = librarySheets([refs.magicItems.bag_of_holding, refs.spells.fireball])
    expect(sheets).toContain('## Library entries it points to')
    expect(sheets).toContain('Bag of Holding [items/bag-of-holding]')
    expect(sheets).toContain('Fireball [spells/fireball]')
    expect(librarySheets([])).toBe('')
  })

  it('adds the library side of a canon check, and says what it cannot find', () => {
    const check = libraryCheck('The Aboleth waits below.', [], ['Gelatinous Cube', 'Nobody Real'])
    expect(check).toContain('[monsters/aboleth]')
    expect(check).toContain('[monsters/gelatinous-cube]')
    expect(check).toContain('Nobody Real: not a campaign record or a library entry')
    expect(libraryCheck('The party rests.', [], [])).toBe('')
  })
})
