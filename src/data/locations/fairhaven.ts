import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven',
  icon: 'gi/GiMedievalGate',
  type: 'settlement',
  parent: refs.locations.world,
  at: [580, 250],
  notes: [
    [
      'A harbor city gated against outsiders. Entry requires standard traveler paperwork, although membership tattoos from the regionally recognized ',
      refs.organizations.adventurers_guild,
      ' are accepted as credentials. The city is home to one of the guild’s halls.',
    ],
    ['Before the invasion, the city had approximately 4,500 residents.'],
  ],
  map: { url: '/assets/locations/fairhaven.png', width: 1200, height: 700 },
})
