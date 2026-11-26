import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_01_harried_in_hillsfar,
  monsters: {
    duergar: {
      name: 'Duergar',
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1',
        ac: 16,
        hitDice: '4d8',
        speed: { walk: 25 },
        scores: { str: 14, dex: 11, con: 14, int: 11, wis: 10, cha: 9 },
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
            text: ['Opy this document for personal use only.'],
          },
        ],
      },
    },
    manes: {
      name: 'Manes',
      tags: ['demon'],
      alignment: 'chaotic evil',
      languages: ['understands Abyssal but can’t speak'],
      stats: {
        size: 'small',
        type: 'fiend',
        cr: '1/8',
        ac: 9,
        hitDice: '2d6',
        speed: { walk: 20 },
        scores: { str: 10, dex: 9, con: 13, int: 3, wis: 8, cha: 4 },
        senses: { darkvision: 60 },
        damageResistances: [rules.cold, rules.fire, rules.lightning],
        damageImmunities: [rules.poison],
        conditionImmunities: [rules.charmed, rules.frightened, rules.poisoned],
        abilities: [
          {
            key: 'claws',
            name: 'Claws',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d4', type: rules.slashing, addModifier: true }],
            },
            text: ['Ocopy this document for personal use only.'],
          },
        ],
      },
    },
    wild_dog: {
      name: 'Wild Dog',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Farbough Farm', 'Far pasture'],
      appearance: [
        ['A lean wild dog with rounded ears and a patchwork black, brown and cream coat.'],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/8',
        ac: 12,
        hitDice: '1d8',
        speed: { walk: 40 },
        scores: { str: 13, dex: 14, con: 12, int: 3, wis: 12, cha: 7 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'The wild dog has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
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
        ],
      },
    },
    wild_dog_alpha: {
      name: 'Wild Dog Alpha',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Farbough Farm', 'Far pasture'],
      appearance: [
        ['A larger wild dog with upright ears, a dark muzzle and a mottled brown-and-black coat.'],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 12,
        hitDice: '4d10',
        speed: { walk: 50 },
        scores: { str: 17, dex: 15, con: 13, int: 3, wis: 12, cha: 8 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'The wild dog alpha has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The wild dog alpha has advantage on an attack roll against a creature if at least one of the wild dog alpha’s allies is within 5 feet of the creature and the ally isn’t ',
              rules.incapacitated,
              '.',
            ],
          },
          {
            key: 'pounce',
            name: 'Pounce',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: [
              'If the wild dog alpha moves at least 20 feet straight toward a creature and then hits it with a bite attack on the same turn, that target must succeed on a ',
              { dc: 'str' },
              ' Strength saving throw or be knocked ',
              rules.prone,
              '. If the target is ',
              rules.prone,
              ', the lion can make one additional bite attack against it as a bonus action.',
            ],
          },
          {
            key: 'running-leap',
            name: 'Running Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: ['With a 10-foot running start, the wild dog alpha can long jump up to 25 feet.'],
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
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
            text: ['Opy this document for personal use only.'],
          },
        ],
      },
    },
  },
})
