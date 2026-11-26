import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_05_the_seer,
  monsters: {
    winter_wolf: {
      name: 'Winter Wolf',
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '3',
        ac: 13,
        hitDice: '10d10',
        speed: { walk: 50 },
        scores: { str: 18, dex: 13, con: 14, int: 7, wis: 12, cha: 8 },
        abilities: [],
      },
    },
  },
})
