import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Idiot',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'mixed',
  classic: true,
  text: 'Permanently reduce your Intelligence by 1d4+1 (to a minimum score of 1). You can draw one additional card beyond your declared draws.',
  benefit: 'Draw an extra card',
  drawback: 'Permanent -1d4+1 Intelligence',
  extraDraws: 'May draw one more card.',
})
