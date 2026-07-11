import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Blackstone',
  icon: 'gi/GiStoneTower',
  type: 'building',
  parent: refs.locations.shadowpeak,
  at: [1000, 600],
  notes: [['A large, guarded mansion and estate with extensive stables.']],
})
