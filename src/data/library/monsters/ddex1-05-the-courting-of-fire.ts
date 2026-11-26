import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex1_05_the_courting_of_fire,
  monsters: {
    gray_ooze: {
      name: 'Gray Ooze',
      stats: {
        size: 'medium',
        type: 'ooze',
        cr: '1/2',
        ac: 8,
        hitDice: '3d8',
        speed: { walk: 10, climb: 10 },
        scores: { str: 12, dex: 6, con: 16, int: 1, wis: 6, cha: 2 },
        abilities: [],
      },
    },
  },
})
