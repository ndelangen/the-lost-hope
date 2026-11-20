import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Seek and Destroy',
  icon: 'gi/GiBullseye',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  vessel: 'battle-cruiser',
})
