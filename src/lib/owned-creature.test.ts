import { describe, expect, it } from 'vitest'

import { PrintedStatBlock } from '#/definitions/stat-block'

import { printingsByMonster } from './library-monsters'
import { ownedStats, ownerNumbersRead, typicalOwner } from './owned-creature'
import { ownedCreatureKeys, ownedCreatureOf } from './owned-creatures'
import { deriveStatBlock, withOptions } from './stat-block'

const scaled = [...printingsByMonster].flatMap(([monster, printings]) =>
  [...printings]
    .filter(([, printing]) => printing.stats?.scaling)
    .map(([publication, printing]) => ({ monster, publication, stats: printing.stats! })),
)

function at(publication: string, monster: string, level: number, picked: string[] = []) {
  const { stats } = scaled.find(
    (one) => one.monster === monster && one.publication === publication,
  )!
  const creature = ownedCreatureOf(publication, monster)!
  return ownedStats(creature, stats, typicalOwner(stats.scaling!, level), picked)
}

describe('creatures that follow their owner', () => {
  it('each have their own function, and every function belongs to one', () => {
    const keys = scaled.map(({ publication, monster }) => `${publication}/${monster}`)
    expect(keys.toSorted()).toEqual(ownedCreatureKeys.toSorted())
    // Every function file beside the index is in it.
    const files = Object.keys(import.meta.glob('/src/data/library/owned/*/*.ts'))
    expect(files).toHaveLength(ownedCreatureKeys.length)
  })

  it('make a whole stat block at every level and in every form', () => {
    for (const { monster, publication, stats } of scaled) {
      const creature = ownedCreatureOf(publication, monster)!
      const forms = stats.options?.filter((option) => option.form).map(({ key }) => [key]) ?? []
      for (let level = stats.scaling!.min; level <= stats.scaling!.max; level++)
        for (const picked of forms.length ? forms : [[]]) {
          const label = `${publication}/${monster} at ${level} ${picked.join()}`
          const worked = creature.stats(stats, typicalOwner(stats.scaling!, level), picked)
          expect.soft(PrintedStatBlock.safeParse(worked).error?.message, label).toBeUndefined()
          expect.soft(deriveStatBlock(withOptions(worked, picked)).maxHp, label).toBeGreaterThan(0)
        }
    }
  })

  it('takes the numbers of the form picked', () => {
    const fiend = (form: string) => at('player_s_handbook_2024', 'fiendish_spirit', 6, [form])
    expect(deriveStatBlock(fiend('yugoloth')).maxHp).toBe(60)
    expect(deriveStatBlock(fiend('devil')).maxHp).toBe(40)
    const familiar = (form: string[]) => at('arcana_unleashed', 'battle_familiar', 4, form)
    expect(familiar(['brute']).ac).toBe(17)
    expect(familiar([]).ac).toBe(15)
  })

  it('shows a summon’s hit points without hit dice, and a companion’s with them', () => {
    expect(deriveStatBlock(at('player_s_handbook_2024', 'fiendish_spirit', 7)).hitPoints).toBe('65')
    const defender = at('tasha_s_cauldron_of_everything', 'steel_defender', 9)
    expect(defender.hitDice).toBe('9d8')
  })

  it('asks the page only for the owner numbers its function looks at', () => {
    const { stats } = scaled.find(({ monster }) => monster === 'steel_defender')!
    const defender = ownedCreatureOf('tasha_s_cauldron_of_everything', 'steel_defender')!
    expect(ownerNumbersRead(defender, stats, stats.scaling!, [])).toEqual([
      'proficiencyBonus',
      'spellAttack',
      'int',
    ])
  })

  it('give the armor class and hit points the book’s formula gives, at its lowest and highest level', () => {
    // Checked once against each book's printed formula, for an owner with these modifiers.
    const modifiers = { str: 1, dex: 2, con: 3, int: 4, wis: 5, cha: 0 }
    const worked = scaled.flatMap(({ monster, publication, stats }) => {
      const creature = ownedCreatureOf(publication, monster)!
      const forms = stats.options?.filter((option) => option.form).map(({ key }) => key) ?? []
      return (forms.length ? forms : ['-']).flatMap((form) =>
        [stats.scaling!.min, stats.scaling!.max].map((level) => {
          const owner = { ...typicalOwner(stats.scaling!, level), modifiers }
          const block = ownedStats(creature, stats, owner, form === '-' ? [] : [form])
          return `${publication}/${monster} ${form} ${level}: AC ${block.ac}, HP ${deriveStatBlock(block).maxHp}`
        }),
      )
    })
    expect(worked.toSorted()).toEqual(BOOK_VALUES.toSorted())
  })
})

const BOOK_VALUES = [
  'arcana_unleashed/battle_familiar brute 2: AC 15, HP 30',
  'arcana_unleashed/battle_familiar brute 9: AC 22, HP 65',
  'arcana_unleashed/battle_familiar flyer 2: AC 13, HP 20',
  'arcana_unleashed/battle_familiar flyer 9: AC 20, HP 55',
  'arcana_unleashed/battle_familiar stalker 2: AC 13, HP 20',
  'arcana_unleashed/battle_familiar stalker 9: AC 20, HP 55',
  'arcana_unleashed/dinosaur_spirit ankylosaur 6: AC 19, HP 60',
  'arcana_unleashed/dinosaur_spirit ankylosaur 9: AC 22, HP 90',
  'arcana_unleashed/dinosaur_spirit triceratops 6: AC 17, HP 60',
  'arcana_unleashed/dinosaur_spirit triceratops 9: AC 20, HP 90',
  'arcana_unleashed/dinosaur_spirit tyrannosaur 6: AC 17, HP 60',
  'arcana_unleashed/dinosaur_spirit tyrannosaur 9: AC 20, HP 90',
  'arcana_unleashed/plant_spirit fungus 5: AC 16, HP 50',
  'arcana_unleashed/plant_spirit fungus 9: AC 20, HP 90',
  'arcana_unleashed/plant_spirit tree 5: AC 18, HP 50',
  'arcana_unleashed/plant_spirit tree 9: AC 22, HP 90',
  'arcana_unleashed/plant_spirit vine 5: AC 16, HP 50',
  'arcana_unleashed/plant_spirit vine 9: AC 20, HP 90',
  'arcana_unleashed/vestige_companion celestial 3: AC 13, HP 16',
  'arcana_unleashed/vestige_companion celestial 20: AC 13, HP 84',
  'arcana_unleashed/vestige_companion fiend 3: AC 13, HP 16',
  'arcana_unleashed/vestige_companion fiend 20: AC 13, HP 84',
  'arcana_unleashed/vestige_companion undead 3: AC 13, HP 16',
  'arcana_unleashed/vestige_companion undead 20: AC 13, HP 84',
  'eberron_forge_of_the_artificer/homunculus_servant - 2: AC 13, HP 15',
  'eberron_forge_of_the_artificer/homunculus_servant - 9: AC 13, HP 50',
  'tasha_s_cauldron_of_everything/homunculus_servant - 3: AC 13, HP 8',
  'tasha_s_cauldron_of_everything/homunculus_servant - 20: AC 13, HP 25',
  'eberron_forge_of_the_artificer/steel_defender - 3: AC 16, HP 20',
  'eberron_forge_of_the_artificer/steel_defender - 20: AC 16, HP 105',
  'tasha_s_cauldron_of_everything/steel_defender - 3: AC 15, HP 21',
  'tasha_s_cauldron_of_everything/steel_defender - 20: AC 17, HP 106',
  'fizban_s_treasury_of_dragons/draconic_spirit chromatic 5: AC 19, HP 50',
  'fizban_s_treasury_of_dragons/draconic_spirit chromatic 9: AC 23, HP 90',
  'fizban_s_treasury_of_dragons/draconic_spirit gem 5: AC 19, HP 50',
  'fizban_s_treasury_of_dragons/draconic_spirit gem 9: AC 23, HP 90',
  'fizban_s_treasury_of_dragons/draconic_spirit metallic 5: AC 19, HP 50',
  'fizban_s_treasury_of_dragons/draconic_spirit metallic 9: AC 23, HP 90',
  'player_s_handbook_2024/draconic_spirit acid 5: AC 19, HP 50',
  'player_s_handbook_2024/draconic_spirit acid 9: AC 23, HP 90',
  'player_s_handbook_2024/draconic_spirit cold 5: AC 19, HP 50',
  'player_s_handbook_2024/draconic_spirit cold 9: AC 23, HP 90',
  'player_s_handbook_2024/draconic_spirit fire 5: AC 19, HP 50',
  'player_s_handbook_2024/draconic_spirit fire 9: AC 23, HP 90',
  'player_s_handbook_2024/draconic_spirit lightning 5: AC 19, HP 50',
  'player_s_handbook_2024/draconic_spirit lightning 9: AC 23, HP 90',
  'player_s_handbook_2024/draconic_spirit poison 5: AC 19, HP 50',
  'player_s_handbook_2024/draconic_spirit poison 9: AC 23, HP 90',
  'fizban_s_treasury_of_dragons/drake_companion - 3: AC 16, HP 20',
  'fizban_s_treasury_of_dragons/drake_companion - 20: AC 20, HP 105',
  'player_s_handbook_2024/aberrant_spirit beholderkin 4: AC 15, HP 40',
  'player_s_handbook_2024/aberrant_spirit beholderkin 9: AC 20, HP 90',
  'player_s_handbook_2024/aberrant_spirit mind-flayer 4: AC 15, HP 40',
  'player_s_handbook_2024/aberrant_spirit mind-flayer 9: AC 20, HP 90',
  'player_s_handbook_2024/aberrant_spirit slaad 4: AC 15, HP 40',
  'player_s_handbook_2024/aberrant_spirit slaad 9: AC 20, HP 90',
  'tasha_s_cauldron_of_everything/aberrant_spirit beholderkin 4: AC 15, HP 40',
  'tasha_s_cauldron_of_everything/aberrant_spirit beholderkin 9: AC 20, HP 90',
  'tasha_s_cauldron_of_everything/aberrant_spirit slaad 4: AC 15, HP 40',
  'tasha_s_cauldron_of_everything/aberrant_spirit slaad 9: AC 20, HP 90',
  'tasha_s_cauldron_of_everything/aberrant_spirit star-spawn 4: AC 15, HP 40',
  'tasha_s_cauldron_of_everything/aberrant_spirit star-spawn 9: AC 20, HP 90',
  'player_s_handbook_2024/animated_object medium-or-smaller 5: AC 15, HP 10',
  'player_s_handbook_2024/animated_object medium-or-smaller 9: AC 15, HP 10',
  'player_s_handbook_2024/animated_object large 5: AC 15, HP 20',
  'player_s_handbook_2024/animated_object large 9: AC 15, HP 20',
  'player_s_handbook_2024/animated_object huge 5: AC 15, HP 40',
  'player_s_handbook_2024/animated_object huge 9: AC 15, HP 40',
  'player_s_handbook_2024/beast_of_the_land - 3: AC 18, HP 20',
  'player_s_handbook_2024/beast_of_the_land - 20: AC 18, HP 105',
  'tasha_s_cauldron_of_everything/beast_of_the_land - 3: AC 15, HP 20',
  'tasha_s_cauldron_of_everything/beast_of_the_land - 20: AC 19, HP 105',
  'player_s_handbook_2024/beast_of_the_sea - 3: AC 18, HP 20',
  'player_s_handbook_2024/beast_of_the_sea - 20: AC 18, HP 105',
  'tasha_s_cauldron_of_everything/beast_of_the_sea - 3: AC 15, HP 20',
  'tasha_s_cauldron_of_everything/beast_of_the_sea - 20: AC 19, HP 105',
  'player_s_handbook_2024/beast_of_the_sky - 3: AC 18, HP 16',
  'player_s_handbook_2024/beast_of_the_sky - 20: AC 18, HP 84',
  'tasha_s_cauldron_of_everything/beast_of_the_sky - 3: AC 15, HP 16',
  'tasha_s_cauldron_of_everything/beast_of_the_sky - 20: AC 19, HP 84',
  'player_s_handbook_2024/bestial_spirit air 2: AC 13, HP 20',
  'player_s_handbook_2024/bestial_spirit air 9: AC 20, HP 55',
  'player_s_handbook_2024/bestial_spirit land 2: AC 13, HP 30',
  'player_s_handbook_2024/bestial_spirit land 9: AC 20, HP 65',
  'player_s_handbook_2024/bestial_spirit water 2: AC 13, HP 30',
  'player_s_handbook_2024/bestial_spirit water 9: AC 20, HP 65',
  'tasha_s_cauldron_of_everything/bestial_spirit air 2: AC 13, HP 20',
  'tasha_s_cauldron_of_everything/bestial_spirit air 9: AC 20, HP 55',
  'tasha_s_cauldron_of_everything/bestial_spirit land 2: AC 13, HP 30',
  'tasha_s_cauldron_of_everything/bestial_spirit land 9: AC 20, HP 65',
  'tasha_s_cauldron_of_everything/bestial_spirit water 2: AC 13, HP 30',
  'tasha_s_cauldron_of_everything/bestial_spirit water 9: AC 20, HP 65',
  'player_s_handbook_2024/celestial_spirit avenger 5: AC 16, HP 40',
  'player_s_handbook_2024/celestial_spirit avenger 9: AC 20, HP 80',
  'player_s_handbook_2024/celestial_spirit defender 5: AC 18, HP 40',
  'player_s_handbook_2024/celestial_spirit defender 9: AC 22, HP 80',
  'tasha_s_cauldron_of_everything/celestial_spirit avenger 5: AC 16, HP 40',
  'tasha_s_cauldron_of_everything/celestial_spirit avenger 9: AC 20, HP 80',
  'tasha_s_cauldron_of_everything/celestial_spirit defender 5: AC 18, HP 40',
  'tasha_s_cauldron_of_everything/celestial_spirit defender 9: AC 22, HP 80',
  'player_s_handbook_2024/construct_spirit clay 4: AC 17, HP 40',
  'player_s_handbook_2024/construct_spirit clay 9: AC 22, HP 115',
  'player_s_handbook_2024/construct_spirit metal 4: AC 17, HP 40',
  'player_s_handbook_2024/construct_spirit metal 9: AC 22, HP 115',
  'player_s_handbook_2024/construct_spirit stone 4: AC 17, HP 40',
  'player_s_handbook_2024/construct_spirit stone 9: AC 22, HP 115',
  'tasha_s_cauldron_of_everything/construct_spirit clay 4: AC 17, HP 40',
  'tasha_s_cauldron_of_everything/construct_spirit clay 9: AC 22, HP 115',
  'tasha_s_cauldron_of_everything/construct_spirit metal 4: AC 17, HP 40',
  'tasha_s_cauldron_of_everything/construct_spirit metal 9: AC 22, HP 115',
  'tasha_s_cauldron_of_everything/construct_spirit stone 4: AC 17, HP 40',
  'tasha_s_cauldron_of_everything/construct_spirit stone 9: AC 22, HP 115',
  'player_s_handbook_2024/elemental_spirit air 4: AC 15, HP 50',
  'player_s_handbook_2024/elemental_spirit air 9: AC 20, HP 100',
  'player_s_handbook_2024/elemental_spirit earth 4: AC 15, HP 50',
  'player_s_handbook_2024/elemental_spirit earth 9: AC 20, HP 100',
  'player_s_handbook_2024/elemental_spirit fire 4: AC 15, HP 50',
  'player_s_handbook_2024/elemental_spirit fire 9: AC 20, HP 100',
  'player_s_handbook_2024/elemental_spirit water 4: AC 15, HP 50',
  'player_s_handbook_2024/elemental_spirit water 9: AC 20, HP 100',
  'tasha_s_cauldron_of_everything/elemental_spirit air 4: AC 15, HP 50',
  'tasha_s_cauldron_of_everything/elemental_spirit air 9: AC 20, HP 100',
  'tasha_s_cauldron_of_everything/elemental_spirit earth 4: AC 15, HP 50',
  'tasha_s_cauldron_of_everything/elemental_spirit earth 9: AC 20, HP 100',
  'tasha_s_cauldron_of_everything/elemental_spirit fire 4: AC 15, HP 50',
  'tasha_s_cauldron_of_everything/elemental_spirit fire 9: AC 20, HP 100',
  'tasha_s_cauldron_of_everything/elemental_spirit water 4: AC 15, HP 50',
  'tasha_s_cauldron_of_everything/elemental_spirit water 9: AC 20, HP 100',
  'player_s_handbook_2024/fey_spirit fuming 3: AC 15, HP 30',
  'player_s_handbook_2024/fey_spirit fuming 9: AC 21, HP 90',
  'player_s_handbook_2024/fey_spirit mirthful 3: AC 15, HP 30',
  'player_s_handbook_2024/fey_spirit mirthful 9: AC 21, HP 90',
  'player_s_handbook_2024/fey_spirit tricksy 3: AC 15, HP 30',
  'player_s_handbook_2024/fey_spirit tricksy 9: AC 21, HP 90',
  'tasha_s_cauldron_of_everything/fey_spirit fuming 3: AC 15, HP 30',
  'tasha_s_cauldron_of_everything/fey_spirit fuming 9: AC 21, HP 90',
  'tasha_s_cauldron_of_everything/fey_spirit mirthful 3: AC 15, HP 30',
  'tasha_s_cauldron_of_everything/fey_spirit mirthful 9: AC 21, HP 90',
  'tasha_s_cauldron_of_everything/fey_spirit tricksy 3: AC 15, HP 30',
  'tasha_s_cauldron_of_everything/fey_spirit tricksy 9: AC 21, HP 90',
  'player_s_handbook_2024/fiendish_spirit demon 6: AC 18, HP 50',
  'player_s_handbook_2024/fiendish_spirit demon 9: AC 21, HP 95',
  'player_s_handbook_2024/fiendish_spirit devil 6: AC 18, HP 40',
  'player_s_handbook_2024/fiendish_spirit devil 9: AC 21, HP 85',
  'player_s_handbook_2024/fiendish_spirit yugoloth 6: AC 18, HP 60',
  'player_s_handbook_2024/fiendish_spirit yugoloth 9: AC 21, HP 105',
  'tasha_s_cauldron_of_everything/fiendish_spirit demon 6: AC 18, HP 50',
  'tasha_s_cauldron_of_everything/fiendish_spirit demon 9: AC 21, HP 95',
  'tasha_s_cauldron_of_everything/fiendish_spirit devil 6: AC 18, HP 40',
  'tasha_s_cauldron_of_everything/fiendish_spirit devil 9: AC 21, HP 85',
  'tasha_s_cauldron_of_everything/fiendish_spirit yugoloth 6: AC 18, HP 60',
  'tasha_s_cauldron_of_everything/fiendish_spirit yugoloth 9: AC 21, HP 105',
  'player_s_handbook_2024/giant_insect centipede 4: AC 15, HP 30',
  'player_s_handbook_2024/giant_insect centipede 9: AC 20, HP 80',
  'player_s_handbook_2024/giant_insect spider 4: AC 15, HP 30',
  'player_s_handbook_2024/giant_insect spider 9: AC 20, HP 80',
  'player_s_handbook_2024/giant_insect wasp 4: AC 15, HP 30',
  'player_s_handbook_2024/giant_insect wasp 9: AC 20, HP 80',
  'srd_5_2_1/giant_insect centipede 4: AC 15, HP 30',
  'srd_5_2_1/giant_insect centipede 9: AC 20, HP 80',
  'srd_5_2_1/giant_insect spider 4: AC 15, HP 30',
  'srd_5_2_1/giant_insect spider 9: AC 20, HP 80',
  'srd_5_2_1/giant_insect wasp 4: AC 15, HP 30',
  'srd_5_2_1/giant_insect wasp 9: AC 20, HP 80',
  'player_s_handbook_2024/otherworldly_steed celestial 2: AC 12, HP 25',
  'player_s_handbook_2024/otherworldly_steed celestial 9: AC 19, HP 95',
  'player_s_handbook_2024/otherworldly_steed fey 2: AC 12, HP 25',
  'player_s_handbook_2024/otherworldly_steed fey 9: AC 19, HP 95',
  'player_s_handbook_2024/otherworldly_steed fiend 2: AC 12, HP 25',
  'player_s_handbook_2024/otherworldly_steed fiend 9: AC 19, HP 95',
  'player_s_handbook_2024/undead_spirit ghostly 3: AC 14, HP 30',
  'player_s_handbook_2024/undead_spirit ghostly 9: AC 20, HP 90',
  'player_s_handbook_2024/undead_spirit putrid 3: AC 14, HP 30',
  'player_s_handbook_2024/undead_spirit putrid 9: AC 20, HP 90',
  'player_s_handbook_2024/undead_spirit skeletal 3: AC 14, HP 20',
  'player_s_handbook_2024/undead_spirit skeletal 9: AC 20, HP 80',
  'tasha_s_cauldron_of_everything/undead_spirit ghostly 3: AC 14, HP 30',
  'tasha_s_cauldron_of_everything/undead_spirit ghostly 9: AC 20, HP 90',
  'tasha_s_cauldron_of_everything/undead_spirit putrid 3: AC 14, HP 30',
  'tasha_s_cauldron_of_everything/undead_spirit putrid 9: AC 20, HP 90',
  'tasha_s_cauldron_of_everything/undead_spirit skeletal 3: AC 14, HP 20',
  'tasha_s_cauldron_of_everything/undead_spirit skeletal 9: AC 20, HP 80',
  'ravenloft_the_horrors_within/reanimated_companion - 3: AC 14, HP 20',
  'ravenloft_the_horrors_within/reanimated_companion - 20: AC 14, HP 105',
  'tasha_s_cauldron_of_everything/dancing_item - 6: AC 16, HP 40',
  'tasha_s_cauldron_of_everything/dancing_item - 20: AC 16, HP 110',
  'tasha_s_cauldron_of_everything/shadow_spirit despair 3: AC 14, HP 35',
  'tasha_s_cauldron_of_everything/shadow_spirit despair 9: AC 20, HP 125',
  'tasha_s_cauldron_of_everything/shadow_spirit fear 3: AC 14, HP 35',
  'tasha_s_cauldron_of_everything/shadow_spirit fear 9: AC 20, HP 125',
  'tasha_s_cauldron_of_everything/shadow_spirit fury 3: AC 14, HP 35',
  'tasha_s_cauldron_of_everything/shadow_spirit fury 9: AC 20, HP 125',
  'tasha_s_cauldron_of_everything/wildfire_spirit - 2: AC 13, HP 15',
  'tasha_s_cauldron_of_everything/wildfire_spirit - 20: AC 13, HP 105',
  'the_book_of_many_things/deck_defender acrobat 1: AC 16, HP 10',
  'the_book_of_many_things/deck_defender acrobat 20: AC 16, HP 105',
  'the_book_of_many_things/deck_defender berserker 1: AC 16, HP 10',
  'the_book_of_many_things/deck_defender berserker 20: AC 16, HP 105',
  'the_book_of_many_things/deck_defender guardian 1: AC 16, HP 10',
  'the_book_of_many_things/deck_defender guardian 20: AC 16, HP 105',
  'the_book_of_many_things/reaper_spirit - 4: AC 15, HP 40',
  'the_book_of_many_things/reaper_spirit - 9: AC 20, HP 90',
]
