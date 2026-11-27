import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  conch_of_safe_rest: {
    name: 'Conch of Safe Rest',
    category: 'Wondrous Item',
    rarity: 'unknown',
    text: [
      ['Weight · 2 lb'],
      [
        "You can use an action to blow this pearlescent conch like a horn, creating an effect identical with that of a Leomund's tiny hut spell. The conch disappears once the spell takes effect. The effect ends if you leave the spell's area.",
      ],
    ],
    publication: refs.publications.the_tortle_package,
  },
})
