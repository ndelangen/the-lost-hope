import { describe, expect, it } from 'vitest'

import publications from '#/data/library/publications'

import { monsterPrinting, typedLibraryPrinting } from './library-monsters'

describe('library monsters', () => {
  it('derives the printed numbers from the stored stat block', () => {
    const allosaurus = monsterPrinting('allosaurus', 'monster_manual_2014')
    expect(allosaurus?.derived.hitPoints).toBe('51 (6d10 + 18)')
    expect(allosaurus?.derived.passivePerception).toBe(15)
  })

  it('finds a reprint through the book that holds the stat block', () => {
    const reprint = monsterPrinting('allosaurus', 'basic_rules_2018')
    expect(reprint?.heldBy.name).toBe('Monster Manual')
    expect(reprint?.printing).toBe(monsterPrinting('allosaurus', 'monster_manual_2014')?.printing)
  })

  it('maps the older text library onto typed printings', () => {
    expect(typedLibraryPrinting('allosaurus', 'Basic Rules (2018)')).toBeDefined()
    expect(typedLibraryPrinting('allosaurus', 'Unknown book')).toBeUndefined()
  })

  it('knows every publication a printing names', () => {
    expect(Object.keys(publications)).toContain('monster_manual_2014')
  })
})
