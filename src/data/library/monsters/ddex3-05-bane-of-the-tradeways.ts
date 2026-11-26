import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_05_bane_of_the_tradeways,
  monsters: {
    bandit_captain: {
      name: 'Bandit Captain',
      tags: ['any race'],
      alignment: 'any non-lawful alignment',
      languages: ['any two languages'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 15,
        armor: 'studded leather',
        hitDice: '10d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 16, con: 14, int: 14, wis: 11, cha: 14 },
        saves: { str: 'proficient', dex: 'proficient', wis: 'proficient' },
        skills: { athletics: 'proficient', deception: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: [
              'The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers.',
            ],
          },
          {
            key: 'scimitar',
            name: 'Scimitar',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'dagger',
            name: 'Dagger',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              thrown: [20, 60],
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'parry',
            name: 'Parry',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The captain adds 2 to its AC against one melee attack that would hit it. To do so, the captain must see the attacker and be wielding a melee weapon.',
            ],
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
    red_plume_cavalry_officer: {
      name: 'Red Plume Cavalry Officer',
      tags: ['human'],
      alignment: 'any alignment',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1',
        ac: 17,
        armor: 'splint',
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 11, con: 14, int: 11, wis: 11, cha: 10 },
        skills: { animal_handling: 'proficient', athletics: 'proficient' },
        abilities: [
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The Red Plume cavalry officer makes two melee attacks.'],
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
              printedBonus: 5,
              damage: [{ dice: '1d8', type: rules.slashing, addModifier: true }],
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
              damage: [{ dice: '1d10', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'parry',
            name: 'Parry',
            timing: 'reaction',
            icon: 'gi/GiMagicSwirl',
            text: [
              'The Red Plume cavalry officer adds 2 to its AC against one melee attack that would hit it. To do so, the Red Plume cavalry officer t must see the attacker and be wielding a melee weapon.',
            ],
          },
        ],
      },
    },
  },
})
