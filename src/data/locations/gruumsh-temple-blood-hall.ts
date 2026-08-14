import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh Temple Blood Hall',
  icon: 'gi/GiBlood',
  type: 'building',
  parent: refs.locations.gruumsh_war_temple,
  at: [0, 0],
  notes: [
    [
      'A meticulously clean communal feast room in the ',
      refs.locations.gruumsh_war_temple,
      '. Its blood-soaked name and martial atmosphere coexist with strict standards of hygiene and sanitation.',
    ],
  ],
})
