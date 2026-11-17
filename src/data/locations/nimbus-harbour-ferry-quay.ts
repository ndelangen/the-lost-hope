import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Nimbus Harbour Ferry Quay',
  icon: 'gi/GiCargoCrane',
  type: 'landmark',
  parent: refs.locations.nimbus_harbour,
  at: [840, 620],
  map: { url: '/assets/maps/nimbus-harbour-ferry-quay.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A narrow street between the warehouses opens onto a stone quay and a timber platform over the open sky, where the small flying ferries moor.',
    ],
  ],
})
