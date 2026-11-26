import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_14_the_darklord,
  monsters: {
    assassin: {
      name: 'Assassin',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '8',
        ac: 15,
        hitDice: '12d8',
        speed: { walk: 30 },
        scores: { str: 11, dex: 16, con: 14, int: 13, wis: 11, cha: 10 },
        abilities: [],
      },
    },
    esmae_amarantha: {
      name: 'Esmae Amarantha',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '11',
        ac: 16,
        hitDice: '16d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 10, con: 16, int: 20, wis: 17, cha: 18 },
        abilities: [],
      },
    },
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
  },
})
