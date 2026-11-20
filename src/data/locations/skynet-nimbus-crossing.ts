import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  icon: 'gi/GiAirBalloon',
  name: 'Skynet–Nimbus Crossing',
  map: { url: '/assets/maps/skynet-nimbus-crossing.jpg', width: 1536, height: 1024 },
  illustration: '/assets/locations/skynet-nimbus-crossing-illustration.png',
  type: 'route',
  parent: refs.locations.three_sky_kingdoms,
  at: [592, 318],
  notes: [
    ['The Sky Bridge route between ', refs.locations.skynet, ' and ', refs.locations.nimbus, '.'],
  ],
})
