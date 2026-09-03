import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Night Mothers’ Church',
  icon: 'lucide/MoonStar',
  type: 'building',
  parent: refs.locations.nimbus,
  at: [525, 170],
  notes: [
    [
      'A church on ',
      refs.locations.nimbus,
      ' associated with the Night Mothers. It stands beside the ',
      refs.locations.gruumsh_war_temple,
      '.',
    ],
  ],
})
