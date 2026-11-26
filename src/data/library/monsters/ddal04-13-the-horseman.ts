import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_13_the_horseman,
  monsters: {
    guardian_portrait: {
      name: 'Guardian Portrait',
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '1',
        ac: 5,
        hitDice: '5d8',
        speed: { walk: 0 },
        scores: { str: 1, dex: 1, con: 10, int: 14, wis: 10, cha: 10 },
        abilities: [],
      },
    },
    omou: {
      name: 'Omou',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '10',
        ac: 17,
        hitDice: '21d8',
        speed: { walk: 40 },
        scores: { str: 13, dex: 18, con: 15, int: 16, wis: 17, cha: 12 },
        abilities: [],
      },
    },
  },
})
