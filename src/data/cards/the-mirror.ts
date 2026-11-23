import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Mirror',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'good',
  classic: false,
  text: 'You gain the ability to cast the mirror image spell at will without expending a spell slot. When you do so, the spell creates 2d4 duplicates instead of 1d4 + 3.',
  benefit: 'Cast mirror image at will with enhanced effect',
})
