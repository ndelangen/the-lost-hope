import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Cassian's Replacement Bag of Holding",
  icon: 'gi/GiKnapsack',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: refs.pcs.cassian_veyl,
  craftedBy: null,
  notes: [
    [
      'A greenish-brown Bag of Holding, distinct from the lost blue ',
      refs.items.bag_of_holding,
      '. Its purchase is fully paid. No special frozen-time or random-effect properties have been established for this replacement.',
    ],
  ],
})
