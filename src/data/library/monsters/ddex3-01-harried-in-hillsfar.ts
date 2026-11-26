import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_01_harried_in_hillsfar,
  monsters: {
    duergar: {
      name: 'Duergar',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1',
        ac: 16,
        hitDice: '4d8',
        speed: { walk: 25 },
        scores: { str: 14, dex: 11, con: 14, int: 11, wis: 10, cha: 9 },
        abilities: [],
      },
    },
  },
})
