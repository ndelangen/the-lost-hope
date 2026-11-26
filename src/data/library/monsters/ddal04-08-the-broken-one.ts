import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddal04_08_the_broken_one,
  monsters: {
    frederick_mastiff: {
      name: 'Frederick (Mastiff)',
      alignment: 'unaligned',
      languages: [],
      habitats: ['Orașnou', 'Village'],
      appearance: [
        ['A hefty tricolor basset hound with short legs, a long body and low-hanging brown ears.'],
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
            key: 'keen-smell',
            name: 'Keen Smell',
            timing: 'trait',
            icon: 'gi/GiNoseSide',
            text: ['The mastiff has advantage on Wisdom (Perception) checks that rely on smell.'],
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
            text: [
              'If the target is a creature, it must succeed on a ',
              { dc: 'str' },
              ' Strength saving throw or be knocked ',
              rules.prone,
              '. ersonal use only.',
            ],
          },
        ],
      },
    },
  },
})
