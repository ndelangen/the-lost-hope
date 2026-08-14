import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fajanet City Gate',
  icon: 'gi/GiGate',
  type: 'landmark',
  parent: refs.locations.fajanet,
  at: [0, 0],
  notes: [['The guarded entrance to ', refs.locations.fajanet, '.']],
})
