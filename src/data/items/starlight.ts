import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Starlight',
  icon: 'gi/GiFallingStar',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  vessel: 'battle-cruiser',
  status: 'destroyed',
})
