import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.rise_of_tiamat,
  monsters: {
    sled_dog: {
      name: 'Sled Dog',
      page: 27,
      alignment: 'unaligned',
      languages: [],
      habitats: ['grassland', 'forest', 'hill'],
      appearance: [
        [
          'A sturdy northern sled dog with a black-and-white double coat, pale blue eyes, and a leather pulling harness.',
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
            text: ['The dog has advantage on Perception checks that depend on hearing or smell.'],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The dog has advantage on an attack against a creature within 5 ft. of one of the dog’s allies that is not ',
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
              'A creature hit must succeed on a ',
              { dc: 'str' },
              ' Strength save or fall ',
              rules.prone,
              '.',
            ],
          },
        ],
      },
    },
  },
})
