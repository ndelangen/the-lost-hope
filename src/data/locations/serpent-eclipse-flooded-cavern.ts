import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Flooded Cavern',
  icon: 'gi/GiMountainCave',
  illustration: '/assets/locations/serpent-eclipse-flooded-cavern.jpg',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_maze,
  at: [360, 740],
  map: { url: '/assets/maps/serpent-eclipse-flooded-cavern.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A broad, deep pool below the ',
      refs.locations.serpent_eclipse_waterfall_descent,
      ', lit blue by glowing stones and crystals. Separated stone platforms form a broken crossing toward the ',
      refs.locations.serpent_eclipse_far_landing,
      '.',
    ],
  ],
})
