import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Snowy Mountain Ruin',
  icon: 'gi/GiAncientRuins',
  type: 'landmark',
  parent: refs.locations.snowy_mountains,
  at: [300, 470],
  notes: [['A mountaintop ruin showing clear signs of active restoration.']],
})
