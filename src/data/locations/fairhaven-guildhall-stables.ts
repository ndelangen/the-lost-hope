import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven Guildhall Stables',
  icon: 'fa/FaHorse',
  type: 'district',
  parent: refs.locations.fairhaven_guildhall,
  at: [525, 350],
  notes: [['The stables at the ', refs.locations.fairhaven_guildhall, '.']],
})
