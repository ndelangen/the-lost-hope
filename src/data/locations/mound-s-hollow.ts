import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Mound’s Hollow',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [470, 880],
  notes: [['A small round clearing, trampled flat and slick with rotting leaves.']],
})
