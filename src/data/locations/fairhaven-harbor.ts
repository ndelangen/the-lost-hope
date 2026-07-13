import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven Harbor',
  type: 'district',
  parent: refs.locations.fairhaven,
  at: [0, 0],
  notes: [
    ['The maritime district and principal departure point of ', refs.locations.fairhaven, '.'],
  ],
})
