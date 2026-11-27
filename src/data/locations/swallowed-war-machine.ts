import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Swallowed War Machine',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [950, 385],
  notes: [['A dead end where a dwarven war machine lies on its side, half swallowed by the wall.']],
})
