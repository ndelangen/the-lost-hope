import { refs as libraryRefs } from '#/data/generated/library-refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Cloak of Protection',
  icon: 'gi/GiCloak',
  library: libraryRefs.magicItems.cloak_of_protection,
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [['A wine-red cloak with silver detailing that adjusts to fit its wearer.']],
})
