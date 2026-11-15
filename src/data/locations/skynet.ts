import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet',
  illustration: '/assets/locations/skynet-illustration.png',
  icon: 'gi/GiCloudRing',
  type: 'settlement',
  parent: refs.locations.three_sky_kingdoms,
  at: [845, 461],
  map: { url: '/assets/maps/skynet.jpg', width: 1536, height: 1024, schematicPositions: true },
  notes: [
    [
      'The second inhabited ',
      refs.locations.three_sky_kingdoms,
      ' destination. It is more fortified and restricted than ',
      refs.locations.nimbus,
      ' and has four known dungeons.',
    ],
  ],
})
