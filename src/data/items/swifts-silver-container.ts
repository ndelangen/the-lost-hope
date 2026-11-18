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
      ' during ',
      refs.events.n2_e105,
      '. It holds an unrevealed valuable item.',
    ],
  ],
  foretold: [
    {
      what: [[refs.pcs.swift_starblade, ' can open it. It opens at no other time.']],
      when: { type: 'fullMoon' },
    },
  ],
})
