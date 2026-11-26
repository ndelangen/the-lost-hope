import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_03_the_executioner,
  monsters: {
    ghast: {
      name: 'Ghast',
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '2',
        ac: 13,
        hitDice: '8d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 17, con: 10, int: 11, wis: 10, cha: 8 },
        abilities: [],
      },
    },
  },
})
