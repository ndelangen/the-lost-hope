import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex1_08_tales_trees_tell,
  monsters: {
    imp: {
      name: 'Imp',
      stats: {
        size: 'tiny',
        type: 'fiend',
        cr: '1',
        ac: 13,
        hitDice: '3d4',
        speed: { walk: 20, fly: 40 },
        scores: { str: 6, dex: 17, con: 13, int: 11, wis: 12, cha: 14 },
        abilities: [],
      },
    },
    pixie: {
      name: 'Pixie',
      stats: {
        size: 'tiny',
        type: 'fey',
        cr: '1/4',
        ac: 15,
        hitDice: '1d4',
        speed: { walk: 10, fly: 30 },
        scores: { str: 2, dex: 20, con: 8, int: 10, wis: 14, cha: 15 },
        abilities: [],
      },
    },
  },
})
