import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Left-Door Passage',
  icon: 'gi/GiTwoShadows',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  // Schematic placement within the temple.
  at: [705, 500],
  connections: [
    {
      id: 'arena-entrance',
      type: 'passage',
      label: 'Arena entrance',
      destination: refs.locations.serpent_eclipse_shadow_arena,
      // Schematic placement until the passage has map artwork.
      at: [525, 350],
    },
  ],
  notes: [
    [
      'A roughly one-hundred-metre descending passage. It magically suppresses sound and confronts entrants with personal shadows.',
    ],
  ],
})
