import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Crystal Oasis',
  icon: 'gi/GiOasis',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  // Schematic placement in the temple; the oasis is not located on the approved maze artwork.
  at: [895, 180],
  notes: [
    [
      'A green chamber reached through an anti-magic passage beyond the ',
      refs.locations.serpent_eclipse_rest_chamber,
      '. A second passage is described as poisonous.',
    ],
    [
      'Purple crystal light illuminates plants, mushrooms, purple squirrels, and eyeless birds with four ear-like openings. A floating crystal draws in ambient magic and sustains the greenery.',
    ],
  ],
})
