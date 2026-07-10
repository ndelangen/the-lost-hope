import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Puzzle Room (mountain)',
  icon: 'gi/GiPuzzle',
  type: 'dungeon',
  parent: refs.locations.world,
  at: [800, 200],
  notes: [['A puzzle room with 5 elements chasing each other.']],
  map: { url: '/assets/locations/puzzle-room-mountain.png', width: 1200, height: 700 },
})
