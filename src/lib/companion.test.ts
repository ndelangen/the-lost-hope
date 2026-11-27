import { describe, expect, it } from 'vitest'

import pcs from '#/data/pcs/_index'
import { PC } from '#/definitions/pc'

import { castingAbilityOf, companionInputs, companionStats } from './companion'
import { monsterPrinting } from './library-monsters'
import { deriveStatBlock } from './stat-block'

const defender = {
  creature: { ref: 'monster', key: 'steel_defender' },
  publication: { ref: 'publication', key: 'tasha_s_cauldron_of_everything' },
  name: 'Bolt',
} as const

/** A 9th-level artificer with Intelligence 18. */
const artificer = PC.parse({
  name: 'Tinker',
  player: 'Test',
  status: 'active',
  class: 'Artificer',
  level: 9,
  companions: [defender],
  stats: {
    size: 'small',
    type: 'humanoid',
    ac: 16,
    maxHp: 60,
    speed: { walk: 25 },
    scores: { str: 8, dex: 14, con: 14, int: 18, wis: 12, cha: 10 },
    abilities: [],
  },
})

describe('a PC’s companion', () => {
  const printing = monsterPrinting(defender.creature, defender.publication)!.printing

  it('takes its level, proficiency and Intelligence from its PC', () => {
    const block = deriveStatBlock(companionStats(artificer, defender, printing.stats))
    // 2 + Intelligence modifier (4) + 5 × artificer level (9)
    expect(block.maxHp).toBe(51)
    expect(block.proficiencyBonus).toBe(4)
    expect(block.abilities['force-empowered-rend']?.summary).toBeDefined()
  })

  it('attacks with its PC’s spell attack and adds their proficiency bonus to damage', () => {
    const stats = companionStats(artificer, defender, printing.stats)
    const rend = stats.abilities.find(({ key }) => key === 'force-empowered-rend')!
    // Spell attack: proficiency (4) + Intelligence modifier (4)
    expect(rend.attack?.printedBonus).toBe(8)
    expect(rend.attack?.damage[0]?.printedBonus).toBe(4)
  })
})

describe('the numbers a companion borrows', () => {
  const printing = monsterPrinting(defender.creature, defender.publication)
  const stats = printing!.printing.stats

  it('is found in the library', () => {
    expect(printing).toBeDefined()
  })

  it('keeps a class level inside the levels the feature has', () => {
    const low = PC.parse({ ...artificer, level: 1 })
    expect(companionInputs(low, defender, stats)?.level).toBe(3)
    expect(companionInputs(artificer, { ...defender, level: 20 }, stats)?.level).toBe(20)
  })

  it('casts with the class ability unless the companion says otherwise, and never guesses', () => {
    expect(castingAbilityOf(artificer, defender)).toBe('int')
    expect(castingAbilityOf(artificer, { ...defender, castingAbility: 'wis' })).toBe('wis')
    const multiclass = PC.parse({ ...artificer, class: 'Fighter / Wizard' })
    expect(() => castingAbilityOf(multiclass, defender)).toThrow('needs a castingAbility')
  })

  it('lends the PC’s proficiency bonus even when the PC has no stat block', () => {
    const { stats: _, ...plain } = artificer
    const inputs = companionInputs(PC.parse(plain), defender, stats)!
    expect(inputs.proficiencyBonus).toBe(4)
    expect(inputs.spellAttack).toBe(7)
  })
})

describe('companions in the campaign', () => {
  it('point at a library creature, a printing of it, and options it has', () => {
    for (const pc of Object.values(pcs))
      for (const companion of pc.companions ?? []) {
        const printing = monsterPrinting(companion.creature, companion.publication)
        expect(printing, `${pc.name}: ${companion.creature.key}`).toBeDefined()
        for (const key of companion.options ?? [])
          expect(printing?.printing.stats.options?.map((option) => option.key)).toContain(key)
        // Its spell attack and save DC need an ability the PC casts with.
        const scaling = printing?.printing.stats.scaling
        const casts = Boolean(scaling?.attackBonus || scaling?.saveDc)
        expect(() => casts && castingAbilityOf(pc, companion)).not.toThrow()
      }
  })
})
