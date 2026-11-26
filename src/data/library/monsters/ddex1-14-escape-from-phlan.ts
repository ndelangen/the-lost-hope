import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex1_14_escape_from_phlan,
  monsters: {
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
    vine_blight: {
      name: 'Vine Blight',
      stats: {
        size: 'medium',
        type: 'plant',
        cr: '1/2',
        ac: 12,
        hitDice: '4d8',
        speed: { walk: 10 },
        scores: { str: 15, dex: 8, con: 14, int: 5, wis: 10, cha: 3 },
        abilities: [],
      },
    },
    will_o_wisp: {
      name: "Will-o'-Wisp",
      stats: {
        size: 'tiny',
        type: 'undead',
        cr: '2',
        ac: 19,
        hitDice: '9d4',
        speed: { walk: 0, fly: 50 },
        scores: { str: 1, dex: 28, con: 10, int: 13, wis: 14, cha: 11 },
        abilities: [],
      },
    },
  },
})
