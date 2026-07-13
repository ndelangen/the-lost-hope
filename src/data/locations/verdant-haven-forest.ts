import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Verdant Haven Forest',
  type: 'wilderness',
  parent: refs.locations.verdant_haven,
  at: [0, 0],
  notes: [['The forest surrounding ', refs.locations.verdant_haven, '.']],
})
