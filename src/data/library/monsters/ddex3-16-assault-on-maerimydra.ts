import { refs } from '#/data/generated/library-refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

export default createPublicationMonsters({
  publication: refs.publications.ddex3_16_assault_on_maerimydra,
  monsters: {
    drider: {
      name: 'Drider',
      stats: {
        size: 'large',
        type: 'monstrosity',
        cr: '6',
        ac: 19,
        hitDice: '13d10',
        speed: { walk: 30, climb: 30 },
        scores: { str: 16, dex: 16, con: 18, int: 13, wis: 14, cha: 12 },
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
    grazzt: {
      name: 'Graz’zt',
      stats: {
        size: 'large',
        type: 'fiend',
        cr: '24',
        ac: 20,
        hitDice: '36d10',
        speed: { walk: 40 },
        scores: { str: 22, dex: 15, con: 21, int: 23, wis: 21, cha: 26 },
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
    orc_eye_of_gruumsh: {
      name: 'Orc Eye of Gruumsh',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 16,
        hitDice: '6d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 12, con: 16, int: 9, wis: 13, cha: 12 },
        abilities: [],
      },
    },
    orc_war_chief: {
      name: 'Orc War Chief',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '4',
        ac: 16,
        hitDice: '11d8',
        speed: { walk: 30 },
        scores: { str: 18, dex: 12, con: 18, int: 11, wis: 11, cha: 16 },
        abilities: [],
      },
    },
    quasit: {
      name: 'Quasit',
      stats: {
        size: 'tiny',
        type: 'fiend',
        cr: '1',
        ac: 13,
        hitDice: '3d4',
        speed: { walk: 40 },
        scores: { str: 5, dex: 17, con: 10, int: 7, wis: 10, cha: 10 },
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
        speed: { walk: 30 },
        scores: { str: 1, dex: 17, con: 12, int: 14, wis: 13, cha: 14 },
        abilities: [],
      },
    },
  },
})
