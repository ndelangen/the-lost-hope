import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_08_the_malady_of_elventree,
  monsters: {
    drow_elite_warrior: {
      name: 'Drow Elite Warrior',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '5',
        ac: 18,
        hitDice: '11d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 18, con: 14, int: 11, wis: 13, cha: 12 },
        abilities: [],
      },
    },
    duergar: {
      name: 'Duergar',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1',
        ac: 16,
        hitDice: '4d8',
        speed: { walk: 25 },
        scores: { str: 14, dex: 11, con: 14, int: 11, wis: 10, cha: 9 },
        abilities: [],
      },
    },
    shadow_demon: {
      name: 'Shadow Demon',
      stats: {
        size: 'medium',
        type: 'fiend',
        cr: '4',
        ac: 13,
        hitDice: '12d8',
        speed: { walk: 30, fly: 30 },
        scores: { str: 1, dex: 17, con: 12, int: 14, wis: 13, cha: 14 },
        abilities: [],
      },
    },
  },
})
