import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Lower Stables',
  icon: 'gi/GiStable',
  type: 'district',
  parent: refs.locations.sylvias_flying_bazaar,
  at: [275, 550],
  notes: [['The lowest stable area aboard ', refs.locations.sylvias_flying_bazaar, '.']],
})
