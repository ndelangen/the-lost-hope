import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Green Light',
  icon: 'gi/GiGlowingArtifact',
  type: 'wilderness',
  parent: refs.locations.world,
  at: [400, 400],
  notes: [
    [
      'A meeting point near the mountain named in the warning sent to ',
      refs.pcs.jim,
      '. Its physical nature was never established and is not expected to be revisited.',
    ],
  ],
  map: { url: '/assets/locations/the-green-light.png', width: 1200, height: 700 },
})
