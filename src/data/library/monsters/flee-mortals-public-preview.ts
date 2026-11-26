import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.flee_mortals_public_preview,
  monsters: {
    skitterling: {
      name: 'Skitterling',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Caves', 'Ruins', 'Forests', 'Jagged Edge Hideaway'],
      appearance: [
        ['A housecat-sized, six-legged rodent with broad bat wings and grasping claws.'],
      ],
      tableNotes: [
        ['Public playtest rules. The final printing is a separate publication version.'],
      ],
      stats: {
        size: 'tiny',
        type: 'beast',
        cr: '1/8',
        ac: 13,
        hitDice: '2d4',
        speed: { walk: 30, fly: 60 },
        scores: { str: 4, dex: 16, con: 10, int: 3, wis: 12, cha: 5 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'flyby',
            name: 'Flyby',
            timing: 'trait',
            icon: 'gi/GiFeather',
            text: ["It provokes no opportunity attacks for flying out of an enemy's reach."],
          },
          {
            key: 'claws',
            name: 'Claws',
            timing: 'action',
            icon: 'gi/GiClaws',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'dex',
              reach: 5,
              damage: [{ dice: '1', type: rules.slashing }],
            },
            text: [
              'The target must pass a ',
              { dc: 'con' },
              ' Constitution save or be ',
              { effect: 'blinded' },
              '. Immunity to poison damage or ',
              rules.poisoned,
              ' gives an automatic success.',
            ],
            effects: [
              {
                key: 'blinded',
                name: 'Blinded',
                lands: { on: 'save', save: 'con', dc: 'con' },
                conditions: [rules.blinded],
                lasts: { kind: 'turn', boundary: 'start', whose: 'target' },
              },
            ],
          },
        ],
      },
    },
  },
})
