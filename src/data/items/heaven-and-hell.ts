import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Heaven and Hell',
  icon: 'gi/GiHeavenGate',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  notes: [['A flying battle-cruiser of the ', refs.organizations.tempest_family, '.']],
})
