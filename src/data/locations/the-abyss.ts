import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Abyss',
  icon: 'gi/GiHole',
  type: 'landmark',
  parent: refs.locations.the_caves_of_steel,
  at: [525, 620],
  notes: [
    [
      'A great hole at the bottom of ',
      refs.locations.the_caves_of_steel,
      ', dropping into the dark deep. The people show it to visitors with pride: this is where the master comes in.',
    ],
  ],
  background: [
    ['Every full moon ', refs.npcs.the_11th_marshal, ' rises through it into the Caves to eat.'],
  ],
})
