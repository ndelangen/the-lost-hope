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
  background: [
    [
      'It contains a key. Nothing about it is explained: to ',
      refs.pcs.swift_starblade,
      ' it is just a key.',
    ],
    [
      'The key works on some doors with the right type of lock. It opens the locked door, but not onto the room behind it: it opens onto a broom closet. Whoever steps into the closet and uses the key from the inside can open it onto any door they have previously opened.',
    ],
    [
      'The inspiration is the television series The Lost Room, and the broom closet is a nod to The Stanley Parable.',
    ],
    [
      'Not worked out yet: its limits, such as how many people fit in the closet, which locks count, and what happens to things left inside.',
    ],
  ],
  foretold: [
    {
      what: [[refs.pcs.swift_starblade, ' can open it. It opens at no other time.']],
      when: { type: 'fullMoon' },
    },
  ],
})
