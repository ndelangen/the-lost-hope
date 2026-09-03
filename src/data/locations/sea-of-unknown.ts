import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Sea of Unknown',
  icon: 'gi/GiWaves',
  type: 'region',
  parent: refs.locations.world,
  at: [925, 250],
  notes: [
    ['A sea separating ', refs.locations.verdant_haven, ' from ', refs.locations.fairhaven, '.'],
  ],
})
