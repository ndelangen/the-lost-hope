import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Decay',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'Your maximum hit points are reduced by 1d6 + your Constitution modifier. This reduction is permanent and cannot be restored by normal means. Only a wish spell can restore these hit points.',
  drawback: 'Permanent reduction to max HP',
})
