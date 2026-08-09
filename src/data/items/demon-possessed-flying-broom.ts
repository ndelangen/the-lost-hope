import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Demon-Possessed Flying Broom',
  icon: 'gi/GiMagicBroom',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A flying broom possessed by a demon. It survived the destruction of ',
      refs.pcs.swift_starblade,
      '’s carried magical items because it is an artifact, but it disappeared to an unknown location and may be recoverable.',
    ],
  ],
})
