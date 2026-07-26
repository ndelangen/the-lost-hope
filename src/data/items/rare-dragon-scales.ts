import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Rare Dragon Scales',
  icon: 'gi/GiScales',
  currentOwner: refs.pcs.devan,
  carriedBy: refs.pcs.devan,
  craftedBy: null,
  quantity: 2,
})
