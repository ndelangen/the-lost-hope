import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Steambreather',
  icon: 'gi/GiSteamBlast',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  vessel: 'battle-cruiser',
  status: 'destroyed',
})
