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
              rules.poisoned,
              ' for 1 hour even after healing, and ',
              rules.paralyzed,
              ' while ',
              rules.poisoned,
              ' by this attack.',
            ],
          },
        ],
      },
    },
  },
})
