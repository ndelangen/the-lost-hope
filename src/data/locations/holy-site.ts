import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Holy Site (mountains)',
  icon: 'gi/GiByzantinTemple',
  type: 'landmark',
  parent: refs.locations.world,
  at: [420, 410],
  notes: [
    [
      'A holy site between ',
      refs.locations.mountain_cliff,
      ' and the ',
      refs.locations.puzzle_room,
      '.',
    ],
  ],
  map: { url: '/assets/locations/holy-site-mountains.png', width: 1200, height: 700 },
})
