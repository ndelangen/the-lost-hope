import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex1_03_shadows_over_the_moonsea,
  monsters: {
    warsh: {
      name: 'Warsh',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 9, dex: 14, con: 11, int: 17, wis: 12, cha: 11 },
        abilities: [],
      },
    },
  },
})
