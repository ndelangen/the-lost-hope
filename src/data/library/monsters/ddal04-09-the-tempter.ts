import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_09_the_tempter,
  monsters: {
    phantom_warrior: {
      name: 'Phantom Warrior',
      stats: {
        size: 'medium',
        type: 'undead',
        cr: '3',
        ac: 16,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 11, con: 16, int: 8, wis: 10, cha: 15 },
        abilities: [],
      },
    },
    reflection_guardian: {
      name: 'Reflection Guardian',
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
    wererat: {
      name: 'Wererat',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 12,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8 },
        abilities: [],
      },
    },
  },
})
