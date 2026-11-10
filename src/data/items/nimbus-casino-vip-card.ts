import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Nimbus Casino VIP Card',
  icon: 'gi/GiToken',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A black card bearing a mark, granting access to the casino VIP room on ',
      refs.locations.nimbus,
      '. Whether it can be sold or transferred permanently is unconfirmed.',
    ],
  ],
})
