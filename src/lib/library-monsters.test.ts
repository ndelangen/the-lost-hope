import { readdirSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/library-refs'
import books from '#/data/library/monsters/_index'
import publications from '#/data/library/publications'
import { libraryRecords, loadLibraryIndex } from '#/lib/published-library-data'

import { monsterPrinting, printingsByMonster } from './library-monsters'
import { loadMonsterPrinting } from './load-monster'

const wolf = refs.monsters.wolf
const mm2014 = refs.publications.monster_manual_2014

describe('library monsters', () => {
  it('derives the printed numbers from the stored stat block', () => {
    const printing = monsterPrinting(wolf, mm2014)
    expect(printing?.derived.hitPoints).toBe('11 (2d8 + 2)')
    expect(printing?.derived.passivePerception).toBe(13)
  })

  it('finds a reprint through the book that holds the stat block', () => {
    const reprint = monsterPrinting(wolf, refs.publications.basic_rules_2018)
    expect(reprint?.heldBy.name).toBe('Monster Manual')
    expect(reprint?.printing).toBe(monsterPrinting(wolf, mm2014)?.printing)
  })

  it('registers every publication module', () => {
    const files = readdirSync(path.join(import.meta.dirname, '../data/library/monsters')).filter(
      (file) => file.endsWith('.ts') && file !== '_index.ts',
    )
    expect(books).toHaveLength(files.length)
  })

  it('has a generated ref for exactly the monsters it holds', () => {
    expect(Object.keys(refs.monsters).toSorted()).toEqual([...printingsByMonster.keys()].toSorted())
  })

  it('names only publications it knows', () => {
    for (const { publication, monsters } of books) {
      expect(publications[publication.key]).toBeDefined()
      for (const { reprintedIn = [] } of Object.values(monsters))
        for (const { key } of reprintedIn) expect(publications[key]).toBeDefined()
    }
  })

  it('resolves every converted printing of the older catalog', async () => {
    await loadLibraryIndex(['monsters'])
    const converted = libraryRecords(['monsters']).flatMap(({ printings }) =>
      printings.flatMap(({ typed }) => (typed && 'monster' in typed ? [typed] : [])),
    )
    expect(converted.length).toBeGreaterThan(0)
    expect(
      converted.filter(({ monster, publication }) => !monsterPrinting(monster, publication)),
    ).toEqual([])
  })

  it('loads the same printing from its one book as from every book', async () => {
    expect((await loadMonsterPrinting(wolf, refs.publications.basic_rules_2018))?.printing).toBe(
      monsterPrinting(wolf, mm2014)?.printing,
    )
    for (const [key, printings] of printingsByMonster)
      for (const holder of printings.keys()) {
        const monster = { ref: 'monster', key } as const
        const publication = { ref: 'publication', key: holder } as const
        const loaded = await loadMonsterPrinting(monster, publication)
        expect(loaded?.printing).toBe(monsterPrinting(monster, publication)?.printing)
        for (const reprint of printings.get(holder)!.reprintedIn ?? [])
          expect((await loadMonsterPrinting(monster, reprint))?.heldBy).toEqual(
            monsterPrinting(monster, reprint)?.heldBy,
          )
      }
  })
})
