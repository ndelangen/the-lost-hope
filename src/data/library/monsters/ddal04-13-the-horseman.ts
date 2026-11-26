import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_13_the_horseman,
  monsters: {
    dominated_lumberjack: {
      name: 'Dominated Lumberjack',
      tags: ['human'],
      alignment: 'any alignment',
      languages: ['Common'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 13,
        armor: 'hide armor',
        hitDice: '9d8',
        speed: { walk: 30 },
        scores: { str: 16, dex: 12, con: 17, int: 9, wis: 11, cha: 9 },
        abilities: [
          {
            key: 'reckless',
            name: 'Reckless',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'At the start of its turn, the dominated lumberjack can gain advantage on all melee weapon attack rolls during that turn, but attack rolls against it have advantage until the start of its next turn.',
            ],
          },
          {
            key: 'woodaxe',
            name: 'Woodaxe',
            timing: 'action',
            icon: 'gi/GiBattleAxe',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d10', type: rules.slashing, addModifier: true }],
            },
            text: ['Ersonal use only.'],
          },
        ],
      },
    },
    guardian_portrait: {
      name: 'Guardian Portrait',
      stats: {
        size: 'medium',
        type: 'construct',
        cr: '1',
        ac: 5,
        hitDice: '5d8',
        speed: { walk: 0 },
        scores: { str: 1, dex: 1, con: 10, int: 14, wis: 10, cha: 10 },
        abilities: [],
      },
    },
    omou: {
      name: 'Omou',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '10',
        ac: 17,
        hitDice: '21d8',
        speed: { walk: 40 },
        scores: { str: 13, dex: 18, con: 15, int: 16, wis: 17, cha: 12 },
        abilities: [],
      },
    },
    treant: {
      name: 'Treant',
      alignment: 'chaotic good',
      languages: ['Common', 'Druidic', 'Elvish', 'Sylvan'],
      stats: {
        size: 'huge',
        type: 'plant',
        cr: '9',
        ac: 16,
        armor: 'natural armor',
        hitDice: '12d12',
        speed: { walk: 30 },
        scores: { str: 23, dex: 8, con: 21, int: 12, wis: 16, cha: 12 },
        damageResistances: [rules.bludgeoning, rules.piercing],
        damageVulnerabilities: [rules.fire],
        abilities: [
          {
            key: 'false-appearance',
            name: 'False Appearance',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'While the treant remains motionless, it is indistinguishable from a normal tree.',
            ],
          },
          {
            key: 'siege-monster',
            name: 'Siege Monster',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['The treant deals double damage to objects and structures.'],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The treant makes two slam attacks.'],
          },
          {
            key: 'slam',
            name: 'Slam',
            timing: 'action',
            icon: 'gi/GiFist',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '3d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'rock',
            name: 'Rock',
            timing: 'action',
            icon: 'gi/GiSlingshot',
            intent: 'damage',
            attack: {
              kind: 'ranged',
              ability: 'str',
              range: [60, 180],
              damage: [{ dice: '4d10', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
