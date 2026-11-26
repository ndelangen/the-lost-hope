import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddex3_09_the_waydown,
  monsters: {
    guard_dog_wolf: {
      name: 'Guard Dog (Wolf)',
      page: 26,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Urban'],
      appearance: [
        ['A wolf-like guard dog with a thick gray-brown coat, upright ears, and a long muzzle.'],
      ],
      tableNotes: [
        [
          'Encounter notes: Eight guard dogs sleep in a cage. If roused, they bark and howl and draw two nearby Red Plume sergeants after five rounds. The Red Plumes also include a guard dog in each patrol.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 13,
        armor: 'natural armor',
        hitDice: '2d8',
        speed: { walk: 40 },
        scores: { str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6 },
        skills: { perception: 'proficient', stealth: 'proficient' },
        abilities: [
          {
            key: 'keen-hearing-and-smell',
            name: 'Keen Hearing and Smell',
            timing: 'trait',
            icon: 'gi/GiHumanEar',
            text: [
              'The guard dog has advantage on Wisdom (Perception) checks relying on hearing or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The guard dog has advantage when attacking a creature within 5 ft. of one of its allies, provided that ally is not ',
              rules.incapacitated,
              '.',
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
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '2d4', type: rules.piercing, addModifier: true }],
            },
            text: [
              'If the target is a creature, it must succeed on a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '.',
            ],
          },
        ],
      },
    },
    red_plume_soldier_thug: {
      name: 'Red Plume Soldier (Thug)',
      tags: ['any race'],
      alignment: 'any non-good alignment',
      languages: ['any one language (usually Common)'],
      stats: {
        size: 'medium',
        type: 'humanoid',
        cr: '1/2',
        ac: 15,
        armor: 'chain shirt, shield',
        hitDice: '5d8',
        speed: { walk: 30 },
        scores: { str: 15, dex: 11, con: 14, int: 10, wis: 10, cha: 11 },
        skills: { intimidation: 'proficient' },
        abilities: [
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The thug has advantage on an attack roll against a creature if at least one of the thug’s allies is within 5 feet of the creature and the ally isn’t ',
              rules.incapacitated,
              '.',
            ],
            effects: [],
          },
          {
            key: 'multiattack',
            name: 'Multiattack',
            timing: 'action',
            icon: 'gi/GiPaw',
            text: ['The thug makes two melee attacks.'],
          },
          {
            key: 'mace',
            name: 'Mace',
            timing: 'action',
            icon: 'gi/GiFlangedMace',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
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
        ],
      },
    },
  },
})
