import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Reve',
  icon: 'gi/GiMountains',
  type: 'region',
  parent: refs.locations.ethium,
  at: [525, 350],
  notes: [['A region of ', refs.locations.ethium, '. Its name is not a hidden clue.']],
})
