import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Shadow Arena',
  icon: 'gi/GiShadowGrasp',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_left_door_passage,
  // Schematic placement until the passage has map artwork.
  at: [525, 350],
  notes: [
    [
      'The combat chamber reached through the ',
      refs.locations.serpent_eclipse_left_door_passage,
      '. Blood gathers in a central pool and can form hostile shadows within the arena.',
    ],
  ],
})
