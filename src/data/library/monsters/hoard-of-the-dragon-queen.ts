import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.hoard_of_the_dragon_queen,
  monsters: {
    golden_stag: {
      name: 'Golden Stag',
      page: 35,
      alignment: 'unaligned',
      languages: [],
      habitats: ['grassland', 'forest', 'hill'],
      appearance: [
        [
          'A tall stag with a coat that shines like spun gold and pale branching antlers that look plated with platinum.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1/4',
        ac: 10,
        hitDice: '2d10',
        speed: { walk: 50 },
        scores: { str: 16, dex: 10, con: 12, int: 2, wis: 10, cha: 6 },
        abilities: [
          {
            key: 'charge',
            name: 'Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'If the stag moves at least 20 ft. straight toward a target and hits it with Ram on the same turn, the hit deals ',
              { roll: '2d6' },
              ' extra damage. A creature hit must also succeed on a ',
              { dc: 'str' },
              ' Strength save or fall ',
              { effect: 'charge-prone' },
              '.',
            ],
            effects: [
              {
                key: 'charge-prone',
                name: 'Prone',
                lands: { on: 'save', save: 'str', dc: 'str' },
                conditions: [rules.prone],
                lasts: { kind: 'until-removed' },
              },
            ],
          },
          {
            key: 'ram',
            name: 'Ram',
            timing: 'action',
            icon: 'gi/GiBull',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.bludgeoning, addModifier: true }],
            },
          },
          {
            key: 'hooves',
            name: 'Hooves',
            timing: 'action',
            icon: 'gi/GiStomp',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d4', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
