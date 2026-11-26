import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Flask of Never-Ending Booze',
  icon: 'gi/GiRoundBottomFlask',
  category: 'Wondrous Item',
  currentOwner: refs.pcs.devan,
  carriedBy: refs.pcs.devan,
  craftedBy: null,
  notes: [['A magical flask that never runs out of booze.']],
})
