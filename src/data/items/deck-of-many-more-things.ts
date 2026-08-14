import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Deck of Many More Things',
  icon: 'gi/GiCardDraw',
  currentOwner: refs.npcs.the_fiddler,
  carriedBy: refs.npcs.the_fiddler,
  craftedBy: null,
  notes: [['A supernatural deck whose card draws impose lasting effects.']],
})
