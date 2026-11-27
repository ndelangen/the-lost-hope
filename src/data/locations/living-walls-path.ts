import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Living Walls Path',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [1105, 560],
  notes: [['A long straight path along the outer wall, where the thorns rustle without wind.']],
})
