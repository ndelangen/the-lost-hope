import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Dagger of Passive Aggression',
  icon: 'gi/GiDaggerRose',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [['A golden magical dagger that makes a passive-aggressive remark whenever it is used.']],
})
