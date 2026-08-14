import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fajanet Guildhall Bathroom',
  icon: 'gi/GiShower',
  type: 'district',
  parent: refs.locations.fajanet_guildhall,
  at: [0, 0],
  notes: [['A bathroom inside the ', refs.locations.fajanet_guildhall, '.']],
})
