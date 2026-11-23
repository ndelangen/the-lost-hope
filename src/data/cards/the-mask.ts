import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Mask',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'mixed',
  classic: false,
  text: 'You gain the ability to change your appearance at will as if using the alter self spell. However, you must use this ability at least once per day or suffer 1d4 psychic damage as your true form tries to reassert itself.',
  benefit: 'Change appearance at will',
  drawback: 'Must use daily or take damage',
})
