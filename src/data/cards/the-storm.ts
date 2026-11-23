import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Storm',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'A devastating storm follows you wherever you go. You take 1d6 lightning damage at the start of each day. All creatures within 30 feet of you also take 1d4 lightning damage at the start of each day. This effect lasts for 30 days.',
  drawback: 'Lightning damage daily to you and nearby creatures for 30 days',
})
