import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_15_szith_morcane_unbound,
  monsters: {
    azer: {
      name: 'Azer',
      stats: {
        size: 'medium',
        type: 'elemental',
        cr: '2',
        ac: 17,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 17, dex: 12, con: 15, int: 12, wis: 13, cha: 10 },
        abilities: [],
      },
    },
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
    drow_mage: {
      name: 'Drow Mage',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '7',
        ac: 12,
        hitDice: '10d8',
        speed: { walk: 30 },
        scores: { str: 9, dex: 14, con: 10, int: 17, wis: 13, cha: 12 },
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
    helmed_horror: {
      name: 'Helmed Horror',
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '4',
        ac: 20,
        hitDice: '8d8',
        speed: { walk: 30, fly: 30 },
        scores: { str: 18, dex: 13, con: 16, int: 10, wis: 10, cha: 10 },
        abilities: [],
      },
    },
    salamander: {
      name: 'Salamander',
      stats: {
        size: 'large',
        type: 'elemental',
        cr: '5',
        ac: 15,
        hitDice: '12d10',
        speed: { walk: 30 },
        scores: { str: 18, dex: 14, con: 15, int: 11, wis: 10, cha: 12 },
        abilities: [],
      },
    },
  },
})
