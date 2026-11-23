import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Moon',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: true,
  text: 'You are granted the ability to cast the wish spell 1d3 times.',
  benefit: 'Cast wish 1d3 times',
})
