import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh Temple Blood Hall',
  illustration: '/assets/locations/gruumsh-temple-blood-hall-illustration.png',
  icon: 'gi/GiBlood',
  type: 'building',
  parent: refs.locations.gruumsh_war_temple,
  at: [691, 676],
  map: { url: '/assets/maps/gruumsh-temple-blood-hall.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A communal feast room in the ',
      refs.locations.gruumsh_war_temple,
      '. During feasts, butchered animals, blood, and entrails cover the room. Entrants are magically cleaned before admission as part of the temple’s sanitation practice.',
    ],
  ],
})
