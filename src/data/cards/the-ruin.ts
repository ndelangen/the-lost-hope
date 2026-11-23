import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Ruin',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: true,
  text: 'All forms of wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears.',
  drawback: 'All non-magical wealth lost',
})
