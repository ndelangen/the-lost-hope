import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.princes_of_the_apocalypse_d_d_encounters,
  monsters: {
    feathergale_knight: {
      name: 'Feathergale Knight',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1',
        ac: 16,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 14, dex: 14, con: 12, int: 11, wis: 10, cha: 14 },
        abilities: [],
      },
    },
    shoalar_quanderil: {
      name: 'Shoalar Quanderil',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '4',
        ac: 10,
        hitDice: '8d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 11, dex: 12, con: 16, int: 14, wis: 10, cha: 17 },
        abilities: [],
      },
    },
    skyweaver: {
      name: 'Skyweaver',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 12,
        hitDice: '8d8',
        speed: { walk: 30 },
        scores: { str: 8, dex: 14, con: 12, int: 11, wis: 10, cha: 16 },
        abilities: [],
      },
    },
  },
})
