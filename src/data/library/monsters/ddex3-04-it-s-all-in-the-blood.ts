import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_04_it_s_all_in_the_blood,
  monsters: {
    chasme: {
      name: 'Chasme',
      stats: {
        size: 'large',
        type: 'fiend',
        cr: '6',
        ac: 15,
        hitDice: '13d10',
        speed: { walk: 20, fly: 60 },
        scores: { str: 15, dex: 15, con: 12, int: 11, wis: 14, cha: 10 },
        abilities: [],
      },
    },
  },
})
