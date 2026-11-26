import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.ddep2_mulmaster_undone_v2,
  monsters: {
    wolf: {
      name: 'Wolf',
      page: 37,
      alignment: 'unaligned',
      habitats: ['Urban'],
      appearance: [['An alert gray wolf wearing fitted studded leather barding.']],
      tableNotes: [
        [
          'If the party rescues the Emerald Enclave halfling, the halfling and wolf aid the fight with Crannak. They arrive at the end of round one and enter initiative in round two.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 14,
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
              'The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.',
            ],
          },
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The wolf has advantage on an attack roll against a creature if at least one of its allies is within 5 ft. of that creature and is not ',
              rules.incapacitated,
              '.',
            ],
          },
          {
            key: 'scimitar',
            name: 'Scimitar',
            timing: 'action',
            icon: 'gi/GiBroadsword',
            intent: 'damage',
            attack: {
              kind: 'melee',
              ability: 'str',
              reach: 5,
              damage: [{ dice: '1d6', type: rules.slashing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
