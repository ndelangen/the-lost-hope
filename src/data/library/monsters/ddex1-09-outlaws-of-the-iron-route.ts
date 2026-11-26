import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex1_09_outlaws_of_the_iron_route,
  monsters: {
    grimshackle_jailer: {
      name: 'Grimshackle Jailer',
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
            key: 'light-crossbow',
            name: 'Light Crossbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'str',
              range: [80, 320],
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
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
    halfling_bandits: {
      name: 'Halfling Bandits',
      tags: ['halfling'],
      alignment: 'neutral evil',
      languages: ['Common', 'Halfling'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 12,
        armor: 'leather armor',
        hitDice: '2d8',
        speed: { walk: 25 },
        scores: { str: 9, dex: 13, con: 10, int: 11, wis: 10, cha: 11 },
        abilities: [
          {
            key: 'brave',
            name: 'Brave',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The halfling has advantage on saving throws against being ',
              rules.frightened,
              '.',
            ],
          },
          {
            key: 'halfling-nimbleness',
            name: 'Halfling Nimbleness',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The halfling can move through the space of any creature that is of a size larger than it.',
            ],
          },
          {
            key: 'shortsword',
            name: 'Shortsword',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'sling',
            name: 'Sling',
            timing: 'action',
            icon: 'gi/GiSlingshot',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [30, 120],
              damage: [{ dice: '1d4', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
