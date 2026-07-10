import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Green Light',
  icon: 'gi/GiLighthouse',
  type: 'wilderness',
  parent: refs.locations.world,
  at: [400, 400],
  notes: [['A location near the mountain.']],
  map: { url: '/assets/locations/the-green-light.png', width: 1200, height: 700 },
})
