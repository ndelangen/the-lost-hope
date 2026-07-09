import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Green Light',
  type: 'wilderness',
  parent: refs.locations.world,
  at: [400, 400],
  description: ['A location near the mountain.'],
  map: { url: '/assets/locations/the-green-light.png', width: 1200, height: 700 },
})
