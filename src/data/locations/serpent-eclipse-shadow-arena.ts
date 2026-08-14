import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Shadow Arena',
  icon: 'gi/GiShadowGrasp',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  at: [0, 0],
  notes: [
    [
      'The combat chamber reached through the ',
      refs.locations.serpent_eclipse_left_door_passage,
      '. Blood gathers in a central pool and can form hostile shadows within the arena.',
    ],
  ],
})
