import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet the angel and the dragon (husband and wife)',
  day: 9,
  location: refs.locations.mountain_top,
  mark: { type: 'icon', name: 'hi/HiSparkles' },
  notes: [
    [
      'At the top of the mountain, the party met an ',
      refs.npcs.angel_of_the_mountain,
      ' and a ',
      refs.npcs.dragon_of_the_mountain,
      '.',
    ],
    [
      'They are husband and wife. They have many children, all dragons (',
      refs.beasts.dragon_children,
      ').',
    ],
    [
      'Open: names of the angel and the dragon, or any of the children — not stated. Exact number of children — "many" only.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.revin_grumblefist,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
    ],
  ],
})
