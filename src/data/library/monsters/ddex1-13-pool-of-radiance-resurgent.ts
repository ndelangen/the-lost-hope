import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex1_13_pool_of_radiance_resurgent,
  monsters: {
    dragonwing: {
      name: 'Dragonwing',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 14,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 16, con: 13, int: 11, wis: 11, cha: 13 },
        abilities: [],
      },
    },
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
