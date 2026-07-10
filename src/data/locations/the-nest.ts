import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Nest',
  icon: 'gi/GiNestBirds',
  type: 'building',
  parent: refs.locations.fajanet,
  at: [0, 400],
  notes: [
    ['A working-class tavern.'],
    ['A ground-floor common room with second-floor rooms for travelers.'],
  ],
  map: { url: '/assets/locations/the-tavern.png', width: 1200, height: 700 },
})
