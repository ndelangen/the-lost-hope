import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Demon-Possessed Flying Broom',
  icon: 'gi/GiMagicBroom',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: refs.pcs.swift_starblade,
  notes: [['A flying broom possessed by a demon.']],
})
