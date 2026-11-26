import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.baldur_s_gate_descent_into_avernus,
  monsters: {
    hellwasp_grub: {
      name: 'Hellwasp Grub',
      page: 95,
      alignment: 'unaligned',
      languages: [],
      habitats: ['underdark', 'urban'],
      appearance: [
        [
          'A squat rust-brown grub with no wings, overlapping segments, short legs under the forebody, and prominent jaws.',
        ],
      ],
      tableNotes: [
        [
          'Encounter: Roll 2d6 hostile grubs when a character moves within 5 ft. of an angel carcass or takes piercing or slashing damage within 15 ft. of it. The carcass bursts and releases the grubs. Three adult hellwasps also guard that level and use their separate printed rules.',
        ],
      ],
      stats: {
        size: 'small',
        type: 'beast',
        cr: '1/4',
        ac: 13,
        armor: 'natural armor',
        hitDice: '1d6',
        speed: { walk: 30, climb: 30 },
        scores: { str: 5, dex: 14, con: 12, int: 1, wis: 7, cha: 3 },
        senses: { blindsight: 30 },
        abilities: [
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
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
            save: {
              ability: 'con',
              dc: 'con',
              target: { creatures: 1, range: 5, which: 'it hits' },
              onFail: {
                damage: [{ dice: '3d6', type: rules.poison }],
              },
            },
            text: [
              'If this poison damage brings the target to 0 HP, it is stable, ',
              { effect: 'grub-poison' },
              ' even after healing',
              '.',
            ],
            effects: [
              {
                key: 'grub-poison',
                name: 'Poisoned and paralyzed by this attack',
                lands: { on: 'use' },
                conditions: [rules.poisoned, rules.paralyzed],
                lasts: { kind: 'time', amount: '1', unit: 'hour' },
              },
            ],
          },
        ],
      },
    },
    peacock: {
      name: 'Peacock',
      page: 195,
      alignment: 'unaligned',
      habitats: ['grassland', 'hill', 'desert'],
      appearance: [
        ['A male peafowl with a blue crested head, blue neck, and an eyespotted green train.'],
      ],
      tableNotes: [
        [
          'Encounter: Outer City Denizens result 7 has 1d4 commoners herding 2d8 goats and one peacock. The encounter uses the Vulture statistics unchanged.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '0',
        ac: 10,
        hitDice: '1d8',
        speed: { walk: 10, fly: 50 },
        scores: { str: 7, dex: 10, con: 13, int: 2, wis: 12, cha: 4 },
        skills: { perception: 'proficient' },
        abilities: [
          {
            key: 'keen-sight-and-smell',
            name: 'Keen Sight and Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: [
              'The peacock has advantage on Wisdom (Perception) checks that use sight or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The peacock has advantage on attacks against targets within 5 ft. of a non-',
              rules.incapacitated,
              ' ally of the peacock.',
            ],
            effects: [],
          },
          {
            key: 'beak',
            name: 'Beak',
            timing: 'action',
            icon: 'gi/GiRaven',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
