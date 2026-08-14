import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Jim’s Kenku Suit',
  icon: 'gi/GiClothes',
  currentOwner: refs.pcs.jim,
  carriedBy: null,
  craftedBy: null,
  notes: [['The physical kenku disguise formerly worn by ', refs.pcs.jim, '.']],
})
