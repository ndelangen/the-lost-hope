import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex2_02_embers_of_elmwood,
  monsters: {
    azer: {
      name: 'Azer',
      stats: {
        size: 'medium',
        type: 'elemental',
        cr: '2',
        ac: 17,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 17, dex: 12, con: 15, int: 12, wis: 13, cha: 10 },
        abilities: [],
      },
    },
    fire_snake: {
      name: 'Fire Snake',
      stats: {
        size: 'medium',
        type: 'elemental',
        cr: '1',
        ac: 14,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 12, dex: 14, con: 11, int: 7, wis: 10, cha: 8 },
        abilities: [],
      },
    },
    magma_mephit: {
      name: 'Magma Mephit',
      stats: {
        size: 'small',
        type: 'elemental',
        cr: '1/2',
        ac: 11,
        hitDice: '5d6',
        speed: { walk: 30, fly: 30 },
        scores: { str: 8, dex: 12, con: 12, int: 7, wis: 10, cha: 10 },
        abilities: [],
      },
    },
    steam_mephit: {
      name: 'Steam Mephit',
      stats: {
        size: 'small',
        type: 'elemental',
        cr: '1/4',
        ac: 10,
        hitDice: '6d6',
        speed: { walk: 30, fly: 30 },
        scores: { str: 5, dex: 11, con: 10, int: 11, wis: 10, cha: 12 },
        abilities: [],
      },
    },
  },
})
