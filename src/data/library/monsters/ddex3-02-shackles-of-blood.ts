import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_02_shackles_of_blood,
  monsters: {
    druid: {
      name: 'Druid',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 11,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 12, con: 13, int: 12, wis: 15, cha: 11 },
        abilities: [],
      },
    },
  },
})
