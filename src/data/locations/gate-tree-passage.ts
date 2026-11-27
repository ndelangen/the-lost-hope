import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gate Tree Passage',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [770, 215],
  notes: [['A short opening in the wall, blocked by an old, gnarled tree grown into the thorns.']],
})
