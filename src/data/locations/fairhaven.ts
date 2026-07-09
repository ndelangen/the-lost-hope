import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven',
  type: 'settlement',
  parent: refs.locations.world,
  at: [400, 0],
  description: ["A city; the party's current destination."],
  map: { url: '/assets/locations/fairhaven.png', width: 1200, height: 700 },
})
