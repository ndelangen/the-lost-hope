import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Cloak of Protection',
  icon: 'gi/GiCloak',
  category: 'Wondrous Item',
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A wine-red cloak with silver detailing that adjusts to fit its wearer. It grants a +1 bonus to ',
      refs.rules.armor_class,
      ' and to every ',
      refs.rules.saving_throw,
      '.',
    ],
    [
      {
        type: 'link',
        label: 'Standard Cloak of Protection rules on D&D Beyond',
        url: 'https://www.dndbeyond.com/magic-items/4607-cloak-of-protection',
      },
    ],
  ],
})
