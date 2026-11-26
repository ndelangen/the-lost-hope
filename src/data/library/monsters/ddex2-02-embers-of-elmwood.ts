import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex2_02_embers_of_elmwood,
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
    guard: {
      name: 'Guard',
      tags: ['any race'],
      alignment: 'any alignment',
      languages: ['any one language (usually Common)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 16,
        armor: 'chain shirt, shield',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 12, con: 12, int: 10, wis: 11, cha: 10 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'spear',
            name: 'Spear',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [20, 60],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
    magma_mephit: {
      name: 'Magma Mephit',
      stats: {
        size: 'small',
        type: 'elemental',
        cr: '1/2',
        ac: 11,
        hitDice: '5d6',
        speed: { walk: 30, fly: 30 },
        scores: { str: 8, dex: 12, con: 12, int: 7, wis: 10, cha: 10 },
        abilities: [],
      },
    },
    steam_mephit: {
      name: 'Steam Mephit',
      stats: {
        size: 'small',
        type: 'elemental',
        cr: '1/4',
        ac: 10,
        hitDice: '6d6',
        speed: { walk: 30, fly: 30 },
        scores: { str: 5, dex: 11, con: 10, int: 11, wis: 10, cha: 12 },
        abilities: [],
      },
    },
    veteran: {
      name: 'Veteran',
      tags: ['any race'],
      alignment: 'any alignment',
      languages: ['any one language (usually Common)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 17,
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 13, con: 14, int: 10, wis: 11, cha: 10 },
        skills: { athletics: 'proficient', perception: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack.',
            ],
          },
          {
            key: 'longsword',
            name: 'Longsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              twoHanded: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'heavy-crossbow',
            name: 'Heavy Crossbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [100, 400],
              damage: [{ dice: '1d10', type: rules.piercing }],
            },
          },
        ],
      },
    },
  },
})
