import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet',
  icon: 'gi/GiCloudRing',
  type: 'settlement',
  parent: refs.locations.three_sky_kingdoms,
  at: [525, 350],
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
