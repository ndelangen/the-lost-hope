import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh Temple Library',
  icon: 'lucide/Library',
  type: 'building',
  parent: refs.locations.gruumsh_war_temple,
  at: [0, 0],
  notes: [
    [
      'The library of the ',
      refs.locations.gruumsh_war_temple,
      ', containing church texts about transformations and creatures embraced by the ',
      refs.organizations.church_of_gruumsh,
      '.',
    ],
  ],
})
