import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet',
  icon: 'gi/GiCloudRing',
  type: 'settlement',
  parent: refs.locations.sky_islands,
  at: [500, 350],
  notes: [
    [
      'The second inhabited ',
      refs.locations.sky_islands,
      ' destination. It is more fortified and restricted than ',
      refs.locations.nimbus,
      ' and has four known dungeons.',
    ],
  ],
})
