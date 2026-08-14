import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Verdant Haven Church',
  icon: 'gi/GiChurch',
  type: 'building',
  parent: refs.locations.verdant_haven,
  at: [300, 300],
  notes: [['A large church capable of feeding and housing many people.']],
})
