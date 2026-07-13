import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Verdant Haven Church',
  type: 'building',
  parent: refs.locations.verdant_haven,
  at: [0, 0],
  notes: [['A large church capable of feeding and housing many people.']],
})
