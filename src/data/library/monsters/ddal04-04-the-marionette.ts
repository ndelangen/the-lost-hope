import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_04_the_marionette,
  monsters: {
    ghast: {
      name: 'Ghast',
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '2',
        ac: 13,
        hitDice: '8d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 17, con: 10, int: 11, wis: 10, cha: 8 },
        abilities: [],
      },
    },
    guardian_portrait: {
      name: 'Guardian Portrait',
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '1',
        ac: 5,
        hitDice: '5d8',
        speed: { walk: 0 },
        scores: { str: 1, dex: 1, con: 10, int: 14, wis: 10, cha: 10 },
        abilities: [],
      },
    },
  },
})
