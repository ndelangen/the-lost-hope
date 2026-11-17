import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Nimbus Sky Bridge Landing',
  illustration: '/assets/locations/nimbus-illustration.png',
  icon: 'gi/GiWoodenPier',
  type: 'landmark',
  parent: refs.locations.nimbus,
  at: [1290, 713],
  map: { url: '/assets/maps/nimbus-sky-bridge-landing.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'The Sky Bridge ferry landing at the timber platform by the stairs on the eastern edge of Nimbus.',
    ],
  ],
})
