import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Thornwall Gap',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [790, 70],
  notes: [
    [
      'The way into the maze, where a dwarven war machine once broke through the wall. Inside, the corridor runs left to a dead end and right to a sheer ledge.',
    ],
  ],
})
