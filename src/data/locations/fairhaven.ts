import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven',
  icon: 'gi/GiModernCity',
  type: 'settlement',
  parent: refs.locations.world,
  at: [400, 0],
  notes: [
    [
      'A harbor city, gated against outsiders — entry requires papers at the gate. Home to a hall of the ',
      refs.organizations.adventurers_guild,
      '.',
    ],
  ],
  map: { url: '/assets/locations/fairhaven.png', width: 1200, height: 700 },
})
