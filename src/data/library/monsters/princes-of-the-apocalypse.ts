import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.princes_of_the_apocalypse,
  monsters: {
    young_bulette: {
      name: 'Young Bulette',
      page: 139,
      alignment: 'unaligned',
      languages: [],
      habitats: ['grassland'],
      appearance: [
        [
          'A juvenile bulette with a low armored body, powerful forelimbs, and a broad toothed mouth.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '2',
        ac: 11,
        armor: 'natural armor',
        hitDice: '6d10',
        speed: { walk: 40 },
        scores: { str: 21, dex: 8, con: 15, int: 2, wis: 12, cha: 6 },
        abilities: [
          {
            key: 'charge',
            name: 'Charge',
            timing: 'trait',
            icon: 'gi/GiBull',
            text: [
              'If it moves at least 20 ft. straight toward a target and hits it with ',
              { ability: 'bite' },
              ' on the same turn, the hit deals ',
              { roll: '2d8' },
              ' extra bludgeoning damage. A creature hit also makes a ',
              { dc: 'str' },
              ' Strength save or falls ',
              rules.prone,
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
              ability: 'str',
              reach: 5,
              damage: [{ dice: '2d8', type: rules.bludgeoning, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
