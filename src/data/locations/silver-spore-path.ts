import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Silver Spore Path',
  type: 'landmark',
  parent: refs.locations.thornwall_maze,
  at: [930, 925],
  notes: [['The long path along the far side of the maze, where the air glitters with spores.']],
})
