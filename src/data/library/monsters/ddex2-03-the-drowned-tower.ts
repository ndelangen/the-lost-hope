import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex2_03_the_drowned_tower,
  monsters: {
    black_pudding: {
      name: 'Black Pudding',
      stats: {
        size: 'large',
        type: 'ooze',
        cr: '4',
        ac: 7,
        hitDice: '10d10',
        speed: { walk: 20, climb: 20 },
        scores: { str: 16, dex: 5, con: 16, int: 1, wis: 6, cha: 1 },
        abilities: [],
      },
    },
  },
})
