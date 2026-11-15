import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh Temple Ritual Room',
  illustration: '/assets/locations/gruumsh-temple-ritual-room-illustration.png',
  icon: 'gi/GiPrayer',
  type: 'building',
  parent: refs.locations.gruumsh_war_temple,
  at: [1060, 287],
  map: { url: '/assets/maps/gruumsh-temple-ritual-room.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A private, soundproofed chamber in the ',
      refs.locations.gruumsh_war_temple,
      ' where the ',
      refs.npcs.gruumsh_high_priest,
      ' performs painful curative and curse-removal rites.',
    ],
  ],
})
