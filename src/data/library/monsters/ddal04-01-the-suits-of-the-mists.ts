import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_01_the_suits_of_the_mists,
  monsters: {
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
            text: ['Ersonal use only.'],
          },
        ],
      },
    },
    ice_cat: {
      name: 'Ice Cat',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Arctic', 'Hills'],
      appearance: [
        ['A pale spotted feline with a thick coat, tufted ears, and a thick ringed tail.'],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 12,
        hitDice: '3d8',
        speed: { walk: 50, climb: 40 },
        scores: { str: 14, dex: 15, con: 10, int: 3, wis: 14, cha: 7 },
        skills: { perception: 'proficient', stealth: 'expert' },
        damageResistances: [rules.cold],
        damageVulnerabilities: [rules.fire],
        abilities: [
          {
            key: 'ice-walk',
            name: 'Ice Walk',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'The ice cat can move across and climb icy surfaces without needing to make an ability check. Additionally, difficult terrain composed of ice or snow doesn’t cost extra movement.',
            ],
          },
          {
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['The ice cat has advantage on Wisdom (Perception) checks that rely on smell.'],
          },
          {
            key: 'pounce',
            name: 'Pounce',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If the ice cat moves at least 20 feet straight toward a creature and then hits it with a claw attack on the same turn, that target must succeed on a ',
              { dc: 'str' },
              ' Strength saving throw or be knocked ',
              rules.prone,
              '. If the target is ',
              rules.prone,
              ', the cat can make one bite attack against it as a bonus action.',
            ],
          },
          {
            key: 'bite',
            name: 'Bite',
            timing: 'action',
            icon: 'gi/GiFangs',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
          },
          {
            key: 'claw',
            name: 'Claw',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
    orog: {
      name: 'Orog',
      tags: ['orc'],
      alignment: 'chaotic evil',
      languages: ['Common', 'Orc'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '2',
        ac: 18,
        armor: 'plate',
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 18, dex: 12, con: 18, int: 12, wis: 11, cha: 12 },
        skills: { intimidation: 'expert', survival: 'proficient' },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'aggressive',
            name: 'Aggressive',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'As a bonus action, the orog can move up to its speed toward a hostile creature that it can see.',
            ],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The orog makes two greataxe attacks.'],
          },
          {
            key: 'greataxe',
            name: 'Greataxe',
            timing: 'action',
            icon: 'gi/GiBattleAxe',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d12', type: rules.slashing, addModifier: true }],
            },
          },
          {
            key: 'javelin',
            name: 'Javelin',
            timing: 'action',
            icon: 'gi/GiThrownDaggers',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              thrown: [30, 120],
              damage: [{ dice: '1d6', type: rules.piercing, addModifier: true }],
            },
            text: ['Ersonal use only.'],
          },
        ],
      },
    },
  },
})
