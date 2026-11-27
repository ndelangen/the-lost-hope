import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Grand Hall',
  icon: 'gi/GiLitCandelabra',
  type: 'building',
  parent: refs.locations.the_caves_of_steel,
  at: [525, 400],
  notes: [
    [
      'The great common hall of ',
      refs.locations.the_caves_of_steel,
      ', where everyone eats together. A large pool of water in it goes down into the ocean depths.',
    ],
  ],
})
