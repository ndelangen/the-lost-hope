import { describe, expect, it } from 'vitest'

import { refs } from '#/data/generated/library-refs'
import books from '#/data/library/monsters/_index'
import spells from '#/data/library/spells'

import { abilityTextSegments } from './dm-ability-text'
import { spellLevelLabel, spellOf } from './library-spells'

describe('library spells', () => {
  it('reads a spell as the SRD prints it', () => {
    const fireball = spellOf(refs.spells.fireball)
    expect(fireball).toMatchObject({ level: 3, school: 'evocation', range: '150 feet' })
    expect(spellLevelLabel(fireball)).toBe('Level 3 Evocation')
    expect(spellLevelLabel(spellOf(refs.spells.light))).toBe('Evocation cantrip')
  })

  it('has a generated ref for exactly the spells it holds', () => {
    expect(Object.keys(refs.spells).toSorted()).toEqual(Object.keys(spells).toSorted())
  })

  it('names only spells it holds in stat blocks', () => {
    const named = books.flatMap(({ monsters }) =>
      Object.values(monsters).flatMap(({ stats }) =>
        stats.abilities.flatMap(({ text }) =>
          text.flatMap((token) =>
            typeof token === 'object' && 'ref' in token && token.ref === 'spell' ? [token] : [],
          ),
        ),
      ),
    )
    expect(named.length).toBeGreaterThan(0)
    expect(named.filter(({ key }) => !spells[key])).toEqual([])
  })

  it('shows a spell in ability text as a spell, not a rules term', () => {
    const [, spell] = abilityTextSegments(['Cast ', refs.spells.fireball], {
      speed: {},
      abilities: {},
      saveDc: {},
      modifier: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
      proficiencyBonus: 2,
    })
    expect(spell).toEqual({ kind: 'spell', spell: refs.spells.fireball })
  })
})
