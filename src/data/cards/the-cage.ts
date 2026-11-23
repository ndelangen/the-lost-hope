import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Cage',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'You are unable to leave a 100-foot radius from the spot where you drew this card. If you try, you are teleported back to that spot and take 2d6 force damage. This effect lasts for 30 days or until a wish spell removes it.',
  drawback: 'Trapped in 100-foot radius for 30 days',
})
