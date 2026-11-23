import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Misfortune',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'You have disadvantage on all attack rolls, ability checks, and saving throws for the next 30 days. This effect cannot be removed by normal means.',
  drawback: 'Disadvantage on all rolls for 30 days',
})
