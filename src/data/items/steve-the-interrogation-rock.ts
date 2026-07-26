import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Steve the Interrogation Rock',
  icon: 'gi/GiDrippingStone',
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'Steve’s original form: a rock named after a memorable interrogation. It no longer exists separately after becoming ',
      refs.items.steve_mace_of_returning,
      '.',
    ],
  ],
})
