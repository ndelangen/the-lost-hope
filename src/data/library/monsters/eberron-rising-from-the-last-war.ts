import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.eberron_rising_from_the_last_war,
  monsters: {
    fastieth: {
      name: 'Fastieth',
      page: 289,
      alignment: 'unaligned',
      languages: [],
      habitats: ['Grassland', 'Talenta Plains', 'Q’barra'],
      appearance: [
        [
          'A human-sized bipedal plant-eater with large eyes, strong hindlegs, and brightly patterned scales.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'beast',
        cr: '1/4',
        ac: 14,
        hitDice: '2d8',
        speed: { walk: 50 },
        scores: { str: 12, dex: 18, con: 10, int: 4, wis: 11, cha: 4 },
        abilities: [
          {
            key: 'quickness',
            name: 'Quickness',
            timing: 'trait',
            icon: 'gi/GiPaw',
            text: ['The fastieth can take Dodge as a bonus action.'],
            uses: 1,
            recharge: 'Recharge 5–6',
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
              damage: [{ dice: '1d8', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
