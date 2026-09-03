import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven Courthouse',
  icon: 'lucide/Gavel',
  type: 'building',
  parent: refs.locations.fairhaven,
  at: [600, 210],
  notes: [
    [
      'A courthouse in ',
      refs.locations.fairhaven,
      ' used by the ',
      refs.organizations.marshals_court,
      '.',
    ],
  ],
})
