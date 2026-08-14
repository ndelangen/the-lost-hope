import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Flying Bazaar Kitchen',
  icon: 'gi/GiKitchenKnives',
  type: 'district',
  parent: refs.locations.sylvias_flying_bazaar,
  at: [0, 0],
  notes: [['The kitchen aboard ', refs.locations.sylvias_flying_bazaar, '.']],
})
