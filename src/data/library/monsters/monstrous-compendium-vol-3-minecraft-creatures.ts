import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.monstrous_compendium_vol_3_minecraft_creatures,
  monsters: {
    wolf_of_the_overworld: {
      name: 'Wolf of the Overworld',
      page: 7,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Forest', 'Taiga'],
      appearance: [['A gray-furred wolf with a thick coat, pointed ears, and a bushy tail.']],
      tableNotes: [
        [
          'Encounter notes: Wild wolves usually ignore humanoids but their pack turns hostile if someone hurts a pack member. Adventurers can tame one by feeding and caring for it. Even tame wolves instinctively attack animated skeletons unless told to sit.',
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
        skills: { perception: 'expert', stealth: 'proficient' },
        abilities: [
          {
            key: 'pack-tactics',
            name: 'Pack Tactics',
            timing: 'trait',
            icon: 'lucide/UsersRound',
            text: [
              'The wolf has advantage on attack rolls against a creature within 5 ft. of one of its allies, provided that ally is not ',
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
