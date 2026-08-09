import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Jaded Amulet',
  icon: 'gi/GiEmeraldNecklace',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [
    [
      'A jade amulet with bronze inlay and a note from ',
      refs.npcs.bob_the_merchant,
      ' reading “Gotcha.”',
    ],
    [
      'When Jim prefers not to be recognized, observers cannot readily recognize or place him. The effect does not conceal him when he explicitly reveals his identity, and sustained attention for roughly ten minutes lets observers begin to pick up on who he is.',
    ],
  ],
})
