import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Purple Dragon Horn',
  icon: 'gi/GiHornInternal',
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'The original form of the ',
      refs.items.serpent_eclipse_trial_disk,
      '. It no longer exists separately after transforming during ',
      refs.events.n2_e128,
      '.',
    ],
  ],
})
