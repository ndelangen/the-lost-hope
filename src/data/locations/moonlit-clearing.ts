import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Moonlit Clearing',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [760, 600],
  notes: [
    [
      'The round clearing at the heart of the maze, where the moon shines brightest on a low mound of moss and mushrooms.',
    ],
  ],
})
