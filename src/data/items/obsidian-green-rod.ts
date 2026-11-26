import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Obsidian Green Rod',
  icon: 'gi/GiCrystalWand',
  category: 'Rod',
  currentOwner: refs.items.little_purple,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'An obsidian-green rod that appears to protect its bearer from lightning. Its exact powers and limitations remain unknown.',
    ],
  ],
})
