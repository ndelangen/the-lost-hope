import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Caves of Steel Generator Room',
  icon: 'gi/GiPowerGenerator',
  type: 'building',
  parent: refs.locations.the_caves_of_steel,
  at: [800, 450],
  notes: [
    [
      'The generator that powers ',
      refs.locations.the_caves_of_steel,
      ' and all its artificial light. It burns Arcane Dust.',
    ],
  ],
})
