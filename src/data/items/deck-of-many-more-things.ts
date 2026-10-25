import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Deck of Many More Things',
  icon: 'gi/GiCardDraw',
  currentOwner: refs.npcs.the_fiddler,
  carriedBy: refs.npcs.the_fiddler,
  craftedBy: null,
  notes: [
    ['A supernatural deck whose card draws impose lasting effects.'],
    [
      {
        type: 'link',
        label: 'Deck of Many More Things on D&D Beyond, book access required',
        url: 'https://www.dndbeyond.com/magic-items/7526639-deck-of-many-more-things',
      },
    ],
  ],
})
