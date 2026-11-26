import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex2_04_mayhem_in_the_earthspur_mines,
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
    nightmare: {
      name: 'Nightmare',
      stats: {
        size: 'large',
        type: 'fiend',
        cr: '3',
        ac: 13,
        hitDice: '8d10',
        speed: { walk: 60, fly: 90 },
        scores: { str: 18, dex: 15, con: 16, int: 10, wis: 13, cha: 15 },
        abilities: [],
      },
    },
  },
})
