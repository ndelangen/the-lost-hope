import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fairhaven City Gate',
  icon: 'gi/GiOpenGate',
  type: 'landmark',
  parent: refs.locations.fairhaven,
  at: [120, 350],
  notes: [['The guarded entrance to ', refs.locations.fairhaven, '.']],
})
