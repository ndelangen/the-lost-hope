import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Flask of Never-Ending Booze',
  icon: 'gi/GiRoundBottomFlask',
  currentOwner: refs.pcs.devan,
  carriedBy: refs.pcs.devan,
  notes: [['A magical flask that never runs out of booze.']],
})
