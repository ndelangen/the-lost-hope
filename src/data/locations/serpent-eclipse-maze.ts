import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Serpent Eclipse Maze',
  illustration: '/assets/locations/serpent-eclipse-maze-illustration.png',
  icon: 'gi/GiMaze',
  type: 'dungeon',
  parent: refs.locations.temple_of_the_serpent_eclipse,
  // Schematic placement within the temple, separate from its doorway in the chamber.
  at: [1229, 225],
  map: {
    url: '/assets/maps/serpent-eclipse-maze.jpg',
    width: 1536,
    height: 1024,
  },
  notes: [['The find-the-flag trial.']],
})
