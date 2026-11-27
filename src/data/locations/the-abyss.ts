import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Abyss',
  icon: 'gi/GiHole',
  illustration: '/assets/locations/the-abyss-illustration.png',
  type: 'landmark',
  parent: refs.locations.the_caves_of_steel,
  at: [525, 620],
  notes: [
    [
      'A great shaft that runs the length of ',
      refs.locations.the_caves_of_steel,
      ', from the open sea below up into the pool of ',
      refs.locations.the_grand_hall,
      '. Every subship enters and leaves through it, and the docks branch off it. The people show it to visitors with pride: this is where the master comes in.',
    ],
  ],
  background: [
    ['Every full moon ', refs.npcs.the_11th_marshal, ' rises through it into the Caves to eat.'],
  ],
})
