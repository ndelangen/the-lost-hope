import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Rest Chamber',
  icon: 'gi/GiCampfire',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_maze,
  at: [1000, 640],
  notes: [
    [
      'A campfire rest point beyond the ',
      refs.locations.serpent_eclipse_far_landing,
      '. A passage continues toward the ',
      refs.locations.serpent_eclipse_crystal_oasis,
      '.',
    ],
  ],
})
