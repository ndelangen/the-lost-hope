import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_03_the_occupation_of_szith_morcane,
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
    chasme: {
      name: 'Chasme',
      stats: {
        size: 'large',
        type: 'fiend',
        cr: '6',
        ac: 15,
        hitDice: '13d10',
        speed: { walk: 20, fly: 60 },
        scores: { str: 15, dex: 15, con: 12, int: 11, wis: 14, cha: 10 },
        abilities: [],
      },
    },
    myconid_adult: {
      name: 'Myconid Adult',
      stats: {
        size: 'medium',
        type: 'plant',
        cr: '1/2',
        ac: 12,
        hitDice: '4d8',
        speed: { walk: 20 },
        scores: { str: 10, dex: 10, con: 12, int: 10, wis: 13, cha: 7 },
        abilities: [],
      },
    },
    myconid_sovereign: {
      name: 'Myconid Sovereign',
      stats: {
        size: 'large',
        type: 'plant',
        cr: '2',
        ac: 13,
        hitDice: '8d10',
        speed: { walk: 30 },
        scores: { str: 12, dex: 10, con: 14, int: 13, wis: 15, cha: 10 },
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
  },
})
