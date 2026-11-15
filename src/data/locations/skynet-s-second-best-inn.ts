import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet’s Second-Best Inn',
  icon: 'gi/GiBunkBeds',
  illustration: '/assets/locations/skynet-s-second-best-inn-illustration.png',
  type: 'building',
  parent: refs.locations.skynet,
  at: [722, 348],
  map: {
    url: '/assets/maps/skynet-s-second-best-inn.jpg',
    width: 1536,
    height: 1024,
    schematicPositions: true,
  },
  notes: [
    [
      'An upscale three-storey inn with private bathrooms, hammocks, a library, an alchemical shop, a massage parlour, a barbershop, dining, and dungeon insurance. Its proper name has not yet been established.',
    ],
  ],
})
