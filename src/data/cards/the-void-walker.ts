import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Void Walker',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'You become ethereal and cannot interact with the material plane. You can see and hear normally, but cannot touch, move, or affect objects or creatures. This effect lasts for 1d4 weeks. Only a wish spell or divine intervention can end this early.',
  drawback: 'Ethereal for 1d4 weeks, cannot interact with material plane',
})
