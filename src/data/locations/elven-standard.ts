import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Elven Standard',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [420, 700],
  notes: [
    ['A dead end on the west side, where an old banner pole stands untouched by the thorns.'],
  ],
})
