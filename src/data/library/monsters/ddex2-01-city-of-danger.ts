import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex2_01_city_of_danger,
  monsters: {
    ankheg: {
      name: 'Ankheg',
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '2',
        ac: 14,
        hitDice: '6d10',
        speed: { walk: 30, burrow: 10 },
        scores: { str: 17, dex: 11, con: 13, int: 1, wis: 13, cha: 6 },
        abilities: [],
      },
    },
    quasit: {
      name: 'Quasit',
      stats: {
        size: 'tiny',
        type: 'fiend',
        cr: '1',
        ac: 13,
        hitDice: '3d4',
        speed: { walk: 40 },
        scores: { str: 5, dex: 17, con: 10, int: 7, wis: 10, cha: 10 },
        abilities: [],
      },
    },
  },
})
