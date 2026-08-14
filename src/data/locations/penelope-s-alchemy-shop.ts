import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Penelope’s Alchemy Shop',
  icon: 'lucide/FlaskConical',
  type: 'building',
  parent: refs.locations.fairhaven,
  at: [0, 0],
  notes: [['The alchemy shop owned by ', refs.npcs.penelope, '.']],
})
