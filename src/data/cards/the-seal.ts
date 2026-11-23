import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Seal',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'One of your attunement slots becomes permanently sealed. You can only attune to two magic items instead of three. This effect is permanent and cannot be removed except by a wish spell.',
  drawback: 'Permanently lose one attunement slot',
})
