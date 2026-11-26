import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex1_10_tyranny_in_phlan,
  monsters: {
    basilisk: {
      name: 'Basilisk',
      stats: {
        size: 'medium',
        type: 'monstrosity',
        cr: '3',
        ac: 15,
        hitDice: '8d8',
        speed: { walk: 20 },
        scores: { str: 16, dex: 8, con: 15, int: 2, wis: 8, cha: 7 },
        abilities: [],
      },
    },
  },
})
