import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Wolfie-Tracking Ring',
  icon: 'fa/FaRing',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: refs.pcs.cassian_veyl,
  craftedBy: null,
  notes: [
    [
      'An otherwise unnamed ring from ',
      refs.npcs.bob_the_merchant,
      ' that lets its wearer locate ',
      refs.beasts.wolfie,
      ' at any time. Its negative effect leaves the attuned wearer insatiably hungry; four normal-sized portions are required to feel satisfied.',
    ],
  ],
})
