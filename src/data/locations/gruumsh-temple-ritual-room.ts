import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh Temple Ritual Room',
  icon: 'gi/GiPrayer',
  type: 'building',
  parent: refs.locations.gruumsh_war_temple,
  at: [0, 0],
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
