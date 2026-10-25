import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Cursed Shadow Sword',
  icon: 'gi/GiSwordWound',
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'The original, cursed form of ',
      refs.items.shadow_sword,
      '. It no longer exists separately from the uncursed blade.',
    ],
  ],
})
