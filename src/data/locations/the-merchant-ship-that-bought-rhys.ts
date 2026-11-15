import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Merchant Ship That Bought Rhys',
  type: 'route',
  parent: refs.locations.world,
  at: [765, 250],
  notes: [['A trading ship under ', refs.npcs.the_merchant_skipper, '. Its name is not recorded.']],
})
