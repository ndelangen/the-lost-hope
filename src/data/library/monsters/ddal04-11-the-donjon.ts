import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddal04_11_the_donjon,
  monsters: {
    dryad: {
      name: 'Dryad',
      stats: {
        size: 'medium',
        type: 'fey',
        cr: '1',
        ac: 11,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 10, dex: 12, con: 11, int: 14, wis: 15, cha: 18 },
        abilities: [],
      },
    },
    fire_snake: {
      name: 'Fire Snake',
      stats: {
        size: 'medium',
        type: 'elemental',
        cr: '1',
        ac: 14,
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 12, dex: 14, con: 11, int: 7, wis: 10, cha: 8 },
        abilities: [],
      },
    },
    lizardfolk: {
      name: 'Lizardfolk',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/2',
        ac: 15,
        hitDice: '4d8',
        speed: { walk: 30, swim: 30 },
        scores: { str: 15, dex: 10, con: 13, int: 7, wis: 12, cha: 7 },
        abilities: [],
      },
    },
  },
})
