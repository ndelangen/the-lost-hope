import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Wolfie-Tracking Ring',
  icon: 'fa/FaRing',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: refs.pcs.cassian_veyl,
  notes: [
    [
      'An otherwise unnamed ring from ',
      refs.npcs.bob_the_merchant,
      ' that lets its wearer locate ',
      refs.beasts.wolfie,
      ' at any time. It also has an unidentified negative effect.',
    ],
  ],
})
