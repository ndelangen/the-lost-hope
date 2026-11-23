import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Pain',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'You are wracked with constant pain. You take a -1 penalty to all ability scores. This penalty is permanent and cannot be removed except by a wish spell or divine intervention.',
  drawback: 'Permanent -1 to all ability scores',
})
