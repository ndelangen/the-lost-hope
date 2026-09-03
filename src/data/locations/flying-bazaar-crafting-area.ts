import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Flying Bazaar Crafting Area',
  icon: 'gi/GiAnvilImpact',
  type: 'district',
  parent: refs.locations.sylvias_flying_bazaar,
  at: [725, 150],
  notes: [['A crafting area aboard ', refs.locations.sylvias_flying_bazaar, '.']],
})
