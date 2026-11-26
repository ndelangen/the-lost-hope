import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex2_04_mayhem_in_the_earthspur_mines,
  monsters: {
    black_pudding: {
      name: 'Black Pudding',
      stats: {
        size: 'large',
        type: 'ooze',
        cr: '4',
        ac: 7,
        hitDice: '10d10',
        speed: { walk: 20, climb: 20 },
        scores: { str: 16, dex: 5, con: 16, int: 1, wis: 6, cha: 1 },
        abilities: [],
      },
    },
    miner: {
      name: 'Miner',
      tags: ['human'],
      alignment: 'neutral',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/8',
        ac: 12,
        armor: 'leather armor',
        hitDice: '2d8',
        speed: { walk: 30 },
        scores: { str: 13, dex: 12, con: 12, int: 10, wis: 10, cha: 10 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'pick',
            name: 'Pick',
            timing: 'action',
            icon: 'lucide/Target',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
        ],
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
