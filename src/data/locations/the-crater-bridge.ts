import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Crater Bridge',
  icon: 'gi/GiBridge',
  type: 'landmark',
  parent: refs.locations.world,
  at: [0, 0],
  notes: [
    [
      'A wooden bridge on the forest road beyond ',
      refs.locations.shadowpeak,
      ', spanning a crater with a drop of at least five hundred feet.',
    ],
  ],
})
