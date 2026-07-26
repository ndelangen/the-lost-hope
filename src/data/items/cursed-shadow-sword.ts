import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Cursed Shadow Sword',
  icon: 'gi/GiSwordWound',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [['A cursed sword with a deadly shadow bound to it.']],
})
