import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Verdant Haven',
  icon: 'gi/GiHidden',
  type: 'settlement',
  parent: refs.locations.world,
  at: [445, 610],
  notes: [
    [
      'A settlement reached from ',
      refs.locations.fairhaven,
      ' across the ',
      refs.locations.sea_of_unknown,
      '.',
    ],
    ['Hidden from maps by a magical protective ward.'],
  ],
})
