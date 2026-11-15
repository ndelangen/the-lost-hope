import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Rest Chamber',
  illustration: '/assets/locations/serpent-eclipse-rest-chamber-illustration.png',
  icon: 'gi/GiCampfire',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_maze,
  at: [1000, 640],
  map: { url: '/assets/maps/serpent-eclipse-rest-chamber.jpg', width: 1536, height: 1024 },
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
