import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Maze',
  icon: 'gi/GiMaze',
  type: 'dungeon',
  parent: refs.locations.serpent_eclipse_three_door_chamber,
  // Middle doorway on the chamber artwork.
  at: [768, 825],
  map: {
    url: '/assets/maps/serpent-eclipse-maze.jpg',
    width: 1536,
    height: 1024,
  },
  notes: [
    [
      'The find-the-flag trial behind the middle door of the ',
      refs.locations.serpent_eclipse_three_door_chamber,
      '.',
    ],
  ],
})
