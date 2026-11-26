import { refs } from '#/data/generated/library-refs.ts'
import { refs as campaignRefs } from '#/data/generated/refs.ts'
import { createPublicationMonsters } from '#/definitions/library.ts'

const { rules } = campaignRefs

export default createPublicationMonsters({
  publication: refs.publications.dungeon_master_s_guide_2014,
  monsters: {
    larva: {
      name: 'Larva',
      alignment: 'neutral evil',
      languages: ["understands the languages it knew in life but can't speak"],
      habitats: ['Hades', 'Lower Planes'],
      appearance: [['A human-faced grub with a soft, segmented body.']],
      tableNotes: [
        ["Rules source: Dungeon Master's Guide (2014), p. 63."],
        [
          'Optional Planar Rule: Vile Transformation. In Hades, a visitor makes a DC 10 Wisdom save after each long rest. On failure they gain one Exhaustion level that cannot be removed while in Hades. At six levels they become a larva permanently and shed all Exhaustion instead of dying.',
        ],
      ],
      stats: {
        size: 'medium',
        type: 'fiend',
        cr: '0',
        ac: 9,
        hitDice: '2d8',
        speed: { walk: 20 },
        scores: { str: 9, dex: 9, con: 10, int: 6, wis: 10, cha: 2 },
        abilities: [
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
              damage: [{ dice: '1d4', type: rules.piercing, addModifier: true }],
            },
          },
        ],
      },
    },
  },
})
