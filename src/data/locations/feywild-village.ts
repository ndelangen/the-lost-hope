import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Feywild Village',
  icon: 'gi/GiVillage',
  type: 'settlement',
  parent: refs.locations.feywild,
  at: [200, 600],
  notes: [['The nearest known village in the Feywild. Its proper name is not yet known.']],
})
