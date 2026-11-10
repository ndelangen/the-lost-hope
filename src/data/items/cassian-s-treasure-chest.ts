import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Cassian's Treasure Chest",
  icon: 'gi/GiChest',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A magical chest created by the Treasure card. Only ',
      refs.pcs.cassian_veyl,
      ' can open it. It cannot move more than 100 feet from where it appeared at the casino on ',
      refs.locations.nimbus,
      ', and cannot be carried away inside a Bag of Holding.',
    ],
    [
      'Withdrawals incur a randomly determined toll, consumed by the chest. The recorded withdrawal used a 10 percent toll.',
    ],
  ],
})
