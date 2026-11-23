import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Vizier',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: true,
  text: 'At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question. Besides information, the answer helps you solve a puzzling problem or other dilemma. In other words, the knowledge comes with wisdom on how to apply it.',
  benefit: 'Answer to one question with wisdom',
})
