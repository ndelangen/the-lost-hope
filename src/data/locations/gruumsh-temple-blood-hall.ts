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
      'A communal feast room in the ',
      refs.locations.gruumsh_war_temple,
      '. During feasts, butchered animals, blood, and entrails cover the room. Entrants are magically cleaned before admission as part of the temple’s sanitation practice.',
    ],
  ],
})
