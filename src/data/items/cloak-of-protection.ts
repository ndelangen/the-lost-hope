import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Cloak of Protection',
  icon: 'gi/GiCloak',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: refs.pcs.cassian_veyl,
  craftedBy: null,
  notes: [
    [
      'A wine-red cloak with silver detailing that adjusts to fit its wearer. It grants a +1 bonus to Armor Class and saving throws.',
    ],
  ],
})
