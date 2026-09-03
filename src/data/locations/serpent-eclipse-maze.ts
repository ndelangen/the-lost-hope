import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Maze',
  icon: 'gi/GiMaze',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  // Schematic placement, not a surveyed dungeon coordinate.
  at: [705, 180],
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
