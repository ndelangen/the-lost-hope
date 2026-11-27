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
      ', where everyone eats together: a giant cylinder at the top of the sphere, with balcony upon balcony facing into it, showing just how many people live here. At its bottom lies a large pool, the top of ',
      refs.locations.the_abyss,
      ', which goes down into the ocean depths. A fancy stage, art and decorations dress the hall, and stairs and elevators climb between the balconies.',
    ],
  ],
})
