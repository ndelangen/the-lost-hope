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
  background: [
    [
      'It stands in the broom closet that the key inside ',
      refs.items.swifts_silver_container,
      ' opens. To get it back, ',
      refs.pcs.swift_starblade,
      ' has to lock someone into the closet in its place.',
    ],
  ],
})
