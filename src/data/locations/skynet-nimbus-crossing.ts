import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet–Nimbus Crossing',
  type: 'route',
  parent: refs.locations.three_sky_kingdoms,
  at: [592, 318],
  notes: [
    ['The Sky Bridge route between ', refs.locations.skynet, ' and ', refs.locations.nimbus, '.'],
  ],
})
