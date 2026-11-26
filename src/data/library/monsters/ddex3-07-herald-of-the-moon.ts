import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_07_herald_of_the_moon,
  monsters: {
    black_pudding: {
      name: 'Black Pudding',
      stats: {
        size: 'large',
        type: 'ooze',
        cr: '4',
        ac: 7,
        hitDice: '10d10',
        speed: { walk: 20, climb: 20 },
        scores: { str: 16, dex: 5, con: 16, int: 1, wis: 6, cha: 1 },
        abilities: [],
      },
    },
    drow_elite_warrior: {
      name: 'Drow Elite Warrior',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '5',
        ac: 18,
        hitDice: '11d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 18, con: 14, int: 11, wis: 13, cha: 12 },
        abilities: [],
      },
    },
    drow_mage: {
      name: 'Drow Mage',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '7',
        ac: 12,
        hitDice: '10d8',
        speed: { walk: 30 },
        scores: { str: 9, dex: 14, con: 10, int: 17, wis: 13, cha: 12 },
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
    shadow_demon: {
      name: 'Shadow Demon',
      stats: {
        size: 'medium',
        type: 'fiend',
        cr: '4',
        ac: 13,
        hitDice: '12d8',
        speed: { walk: 30, fly: 30 },
        scores: { str: 1, dex: 17, con: 12, int: 14, wis: 13, cha: 14 },
        abilities: [],
      },
    },
    vine_blight: {
      name: 'Vine Blight',
      stats: {
        size: 'medium',
        type: 'plant',
        cr: '1/2',
        ac: 12,
        hitDice: '4d8',
        speed: { walk: 10 },
        scores: { str: 15, dex: 8, con: 14, int: 5, wis: 10, cha: 3 },
        abilities: [],
      },
    },
  },
})
