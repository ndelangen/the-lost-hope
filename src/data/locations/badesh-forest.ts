import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Forest Near Badesh',
  icon: 'gi/GiForest',
  type: 'wilderness',
  parent: refs.locations.world,
  at: [200, 0],
  notes: [
    [
      'A forest between the ',
      refs.locations.mountain_top,
      ' landing zone and the town of ',
      refs.locations.badesh,
      '.',
    ],
  ],
  map: { url: '/assets/locations/forest-near-badesh.png', width: 1200, height: 700 },
})
