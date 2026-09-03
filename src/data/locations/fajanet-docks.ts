import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fajanet Docks',
  icon: 'lucide/Dock',
  type: 'district',
  parent: refs.locations.fajanet,
  at: [1080, 600],
  notes: [['The docks serving ', refs.locations.fajanet, '.']],
})
