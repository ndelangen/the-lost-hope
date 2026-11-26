import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_10_the_artifact,
  monsters: {
    wight: {
      name: 'Wight',
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '3',
        ac: 14,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 14, con: 16, int: 10, wis: 13, cha: 15 },
        abilities: [],
      },
    },
    wraith: {
      name: 'Wraith',
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '5',
        ac: 13,
        hitDice: '9d8',
        speed: { walk: 0, fly: 60 },
        scores: { str: 6, dex: 16, con: 16, int: 12, wis: 14, cha: 15 },
        abilities: [],
      },
    },
    young_remorhaz: {
      name: 'Young Remorhaz',
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '5',
        ac: 14,
        hitDice: '11d10',
        speed: { walk: 30, burrow: 20 },
        scores: { str: 18, dex: 13, con: 17, int: 3, wis: 10, cha: 4 },
        abilities: [],
      },
    },
  },
})
