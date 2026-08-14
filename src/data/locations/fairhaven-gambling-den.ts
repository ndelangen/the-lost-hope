import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven Gambling Den',
  icon: 'fa/FaDice',
  type: 'building',
  parent: refs.locations.fairhaven,
  at: [0, 0],
  notes: [['A gambling and drugs den in ', refs.locations.fairhaven, '.']],
})
