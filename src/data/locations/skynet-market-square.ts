import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet Market Square',
  illustration: '/assets/locations/skynet-market-square-illustration.png',
  icon: 'gi/GiDoubleStreetLights',
  type: 'landmark',
  parent: refs.locations.skynet,
  at: [1125, 335],
  notes: [['A public square near the market on ', refs.locations.skynet, '.']],
})
