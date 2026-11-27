import { refs } from '#/data/generated/library-refs.ts'
import { createMagicItems } from '#/definitions/library.ts'

export default createMagicItems({
  bonecounter: {
    name: 'Bonecounter',
    category: 'Weapon',
    detail: 'Mace',
    rarity: 'rare',
    text: [
      ['Weight · 4 lb'],
      [
        "This weapon is a magical +2 mace called Bonecounter. Whenever this weapon is used to destroy an undead creature, a single silver piece appears in the wielder's pocket.",
      ],
    ],
    publication: refs.publications.sleeping_dragon_s_wake,
  },
})
