import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  reliquary_of_dawn: {
    name: 'Reliquary of Dawn',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'This talisman contains a discarded claw, scale, or fang from Eirdu, which many believe is the incarnation of the sun in Lorwyn. While you wear a Reliquary of Dawn, you are immune to the effects of Eventide.',
      ],
    ],
    publication: refs.publications.lorwyn_first_light,
  },
  reliquary_of_twilight: {
    name: 'Reliquary of Twilight',
    category: 'Wondrous Item',
    rarity: 'uncommon',
    text: [
      [
        'This talisman contains a discarded claw, scale, or fang from Isilu, which many believe is the incarnation of the moon in Shadowmoor. While you wear a Reliquary of Twilight, you are immune to the effects of Morningtide.',
      ],
    ],
    publication: refs.publications.lorwyn_first_light,
  },
})
