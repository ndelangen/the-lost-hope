import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.critical_role_call_of_the_netherdeep,
  monsters: {
    moorbounder: {
      name: 'Moorbounder',
      page: 203,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Marsh', 'Foothills'],
      appearance: [
        [
          'A sleek, broad-chested hunting cat with long ivory tusks, powerful hind legs, and large clawed paws.',
        ],
      ],
      tableNotes: [
        [
          'Encounter application: In Moorbounder Mayhem on p. 43, Justice rides a moorbounder named Rice Pudding. The mount is frightened by two bristled moorbounders and bucks as Justice hangs on.',
        ],
      ],
      stats: {
        size: 'large',
        type: 'beast',
        cr: '1',
        ac: 13,
        armor: 'natural armor',
        hitDice: '4d10',
        speed: { walk: 70 },
        scores: { str: 18, dex: 14, con: 14, int: 2, wis: 13, cha: 5 },
        senses: { darkvision: 60 },
        abilities: [
          {
            key: 'standing-leap',
            name: 'Standing Leap',
            timing: 'trait',
            icon: 'gi/GiFrogFoot',
            text: [
              'The moorbounder can long jump up to 40 ft. or high jump up to 20 ft. from a standstill or after a run.',
            ],
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
              damage: [{ dice: '4d4', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
