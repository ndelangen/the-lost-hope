import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The boat to Fairhaven',
  icon: 'gi/GiSailboat',
  type: 'route',
  parent: refs.locations.world,
  at: [420, 250],
  notes: [
    ['A vessel running between ', refs.locations.badesh, ' and ', refs.locations.fairhaven, '.'],
  ],
})
