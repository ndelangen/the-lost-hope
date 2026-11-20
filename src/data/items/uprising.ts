import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Uprising',
  icon: 'gi/GiUprising',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  controlledBy: refs.organizations.the_eyeless_hand,
  notes: [['A flying battle-cruiser of the ', refs.organizations.tempest_family, '.']],
})
