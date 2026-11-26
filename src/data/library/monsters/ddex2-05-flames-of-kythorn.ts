import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex2_05_flames_of_kythorn,
  monsters: {
    fire_snake: {
      name: 'Fire Snake',
      stats: {
        size: 'medium',
        type: 'elemental',
        cr: '1',
        ac: 14,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 12, dex: 14, con: 11, int: 7, wis: 10, cha: 8 },
        abilities: [],
      },
    },
  },
})
