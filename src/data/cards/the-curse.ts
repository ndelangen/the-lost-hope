import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Curse',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'You are afflicted with a terrible curse. At the start of each day, roll a d20. On a 1-5, you cannot cast spells or use class features that day. This curse cannot be removed by normal means—only by a wish spell or divine intervention.',
  drawback: '25% chance daily to lose spell/class features',
})
