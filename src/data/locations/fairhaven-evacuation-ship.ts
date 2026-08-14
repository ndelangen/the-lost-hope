import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven Evacuation Ship',
  icon: 'lucide/Ship',
  type: 'route',
  parent: refs.locations.world,
  at: [0, 0],
  notes: [['An otherwise unnamed civilian transport vessel from ', refs.locations.fairhaven, '.']],
})
