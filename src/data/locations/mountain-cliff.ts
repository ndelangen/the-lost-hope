import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Mountain Cliff',
  icon: 'gi/GiCliffCrossing',
  type: 'landmark',
  parent: refs.locations.world,
  at: [400, 200],
  description: ['A clifftop bearing a sign whose message was never recorded.'],
  map: { url: '/assets/locations/the-mountain-cliff.png', width: 1200, height: 700 },
})
