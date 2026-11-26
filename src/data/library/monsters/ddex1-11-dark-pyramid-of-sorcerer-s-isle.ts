import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex1_11_dark_pyramid_of_sorcerer_s_isle,
  monsters: {
    crawling_claw: {
      name: 'Crawling Claw',
      stats: {
        size: 'tiny',
        type: 'undead',
        cr: '0',
        ac: 12,
        hitDice: '1d4',
        speed: { walk: 20, climb: 20 },
        scores: { str: 13, dex: 14, con: 11, int: 5, wis: 10, cha: 4 },
        abilities: [],
      },
    },
    elf_druid: {
      name: 'Elf Druid',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 11,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 12, con: 13, int: 12, wis: 15, cha: 11 },
        abilities: [],
      },
    },
    helmed_horror: {
      name: 'Helmed Horror',
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '4',
        ac: 20,
        hitDice: '8d8',
        speed: { walk: 30, fly: 30 },
        scores: { str: 18, dex: 13, con: 16, int: 10, wis: 10, cha: 10 },
        abilities: [],
      },
    },
    ochre_jelly: {
      name: 'Ochre Jelly',
      stats: {
        size: 'large',
        type: 'ooze',
        cr: '2',
        ac: 8,
        hitDice: '6d10',
        speed: { walk: 10, climb: 10 },
        scores: { str: 15, dex: 6, con: 14, int: 2, wis: 6, cha: 1 },
        abilities: [],
      },
    },
  },
})
