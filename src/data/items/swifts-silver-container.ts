import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Swift’s Silver Container',
  icon: 'gi/GiLockedChest',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: refs.pcs.swift_starblade,
  craftedBy: null,
  notes: [
    [
      'A sealed silver container won by ',
      refs.pcs.swift_starblade,
      ' during the Fiddler’s game. It can only be opened under a full moon and contains an unrevealed valuable item.',
    ],
  ],
})
