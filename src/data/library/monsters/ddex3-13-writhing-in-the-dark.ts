import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_13_writhing_in_the_dark,
  monsters: {
    githyanki_knight: {
      name: 'Githyanki Knight',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '8',
        ac: 18,
        hitDice: '14d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 14, con: 15, int: 14, wis: 14, cha: 15 },
        abilities: [],
      },
    },
  },
})
