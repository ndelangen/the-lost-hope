import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Uprising',
  icon: 'gi/GiUprising',
  category: 'Mount or Vehicle',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  vessel: 'battle-cruiser',
  controlledBy: refs.organizations.the_eyeless_hand,
})
