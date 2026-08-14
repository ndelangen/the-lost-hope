import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Reception Hall',
  icon: 'gi/GiDesk',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  at: [0, 0],
  notes: [
    [
      'The information and administration area immediately inside the ',
      refs.locations.temple_of_the_serpent_eclipse,
      '. Its attendants brief entrants, answer questions about access, and administer the dungeon’s ten-percent share of recovered treasure.',
    ],
  ],
})
