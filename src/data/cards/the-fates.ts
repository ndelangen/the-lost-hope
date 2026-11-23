import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Fates',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: true,
  text: "Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soon as you draw the card or at any other time before you die.",
  benefit: 'Erase one event as if it never happened',
})
