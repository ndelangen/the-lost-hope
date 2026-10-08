import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Devan's Wandering Priest Robe",
  icon: 'gi/GiRobe',
  currentOwner: refs.pcs.devan,
  carriedBy: refs.pcs.devan,
  craftedBy: null,
  notes: [['A heavy priestly robe that keeps its wearer at a comfortable temperature.']],
})
