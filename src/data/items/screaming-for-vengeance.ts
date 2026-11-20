import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Screaming for Vengeance',
  icon: 'gi/GiScreaming',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  vessel: 'battle-cruiser',
  status: 'under-construction',
  notes: [['Kept in the ', refs.locations.tempest_secret_shipyard, '.']],
})
