import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Rainbow in the Dark',
  icon: 'gi/GiLanternFlame',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  vessel: 'battle-cruiser',
  status: 'destroyed',
})
