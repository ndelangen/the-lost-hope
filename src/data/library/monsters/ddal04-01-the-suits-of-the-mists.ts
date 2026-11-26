import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_01_the_suits_of_the_mists,
  monsters: {
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
