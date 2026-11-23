import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Euryale',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: true,
  text: "The card's medusa-like visage curses you. You take a -2 penalty on saving throws while cursed in this way. Only a god or the magic of The Fates card from this deck can end this curse.",
  drawback: '-2 penalty on all saving throws (requires god or The Fates to remove)',
})
