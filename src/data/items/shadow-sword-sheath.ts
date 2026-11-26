import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Shadow Sword Sheath',
  icon: 'gi/GiScabbard',
  category: 'Wondrous Item',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: refs.pcs.swift_starblade,
  craftedBy: refs.npcs.bessy,
  notes: [['A permanent sheath made to contain ', refs.items.shadow_sword, '.']],
})
