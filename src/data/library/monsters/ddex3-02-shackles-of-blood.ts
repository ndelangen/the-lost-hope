import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_02_shackles_of_blood,
  monsters: {
    captain_erlich: {
      name: 'Captain Erlich',
      tags: ['human'],
      alignment: 'lawful evil',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '3',
        ac: 20,
        armor: 'plate, shield',
        hitDice: '8d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 11, con: 14, int: 11, wis: 11, cha: 15 },
        saves: { con: 'proficient', wis: 'proficient' },
        abilities: [
          {
            key: 'special-equipment',
            name: 'Special Equipment',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['Captain Erlich has two potions of healing.'],
          },
          {
            key: 'brave',
            name: 'Brave',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'Captain Erlich has advantage on saving throws against being ',
              rules.frightened,
              '.',
            ],
            effects: [],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['Captain Erlich makes two melee attacks.'],
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
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'poisoned-heavy-crossbow',
            name: 'Poisoned Heavy Crossbow',
            timing: 'action',
            icon: 'gi/GiCrossbow',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'dex',
              range: [100, 400],
              damage: [{ dice: '1d10', type: rules.piercing, addModifier: true }],
            },
            text: [
              'The target must succeed on a ',
              { dc: 'con', printed: 15 },
              ' saving throw or become ',
              { effect: 'poisoned' },
              '.',
            ],
            effects: [
              {
                key: 'poisoned',
                name: 'Poisoned',
                lands: { on: 'save', save: 'con', dc: 'con', printed: 15 },
                conditions: [rules.poisoned],
                lasts: { kind: 'time', amount: '1d4', unit: 'hour' },
              },
            ],
          },
          {
            key: 'battle-cry',
            name: 'Battle Cry',
            timing: 'action',
            icon: 'gi/GiMagicSwirl',
            text: [
              'Each creature of Captain Erlich’s choice that is within 30 feet of it, can hear it, and not already affected by Battle Cry gain advantage on attack rolls until the start of Captain Erlich’s next turn. Captain Erlich can then make one attack as a bonus action.',
            ],
            uses: 1,
            recharge: 'Long rest',
          },
        ],
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
        armor: 'splint',
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
