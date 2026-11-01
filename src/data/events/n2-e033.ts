import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet the angel and the dragon (husband and wife)',
  day: 9,
  location: refs.locations.mountain_top,
  mark: { type: 'icon', name: 'gi/GiAngelWings' },
  notes: [
    [
      'At the top of the mountain, the party met ',
      refs.npcs.misha,
      ' and the ',
      refs.npcs.dragon_of_the_mountain,
      '.',
    ],
    [
      'They are husband and wife. They have many children, all dragons (',
      refs.beasts.dragon_children,
      ').',
    ],
    ['The dragon and the children remain unnamed. The exact number of children is not recorded.'],
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
