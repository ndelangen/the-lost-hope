import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Left-Door Passage',
  illustration: '/assets/locations/serpent-eclipse-left-door-passage-illustration.png',
  icon: 'gi/GiTwoShadows',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  // Schematic placement within the temple.
  at: [1044, 676],
  connections: [
    {
      id: 'arena-entrance',
      type: 'passage',
      label: 'Arena entrance',
      destination: refs.locations.serpent_eclipse_shadow_arena,
      at: [1398, 563],
    },
  ],
  map: { url: '/assets/maps/serpent-eclipse-left-door-passage.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A roughly one-hundred-metre descending passage. It magically suppresses sound and confronts entrants with personal shadows.',
    ],
  ],
})
