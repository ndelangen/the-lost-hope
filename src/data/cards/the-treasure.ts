import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Treasure',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'good',
  classic: false,
  text: 'A chest containing 10,000 platinum pieces appears before you. The chest is magical and cannot be moved more than 100 feet from where it appeared. You are the only person who can open it.',
  benefit: '10,000 platinum pieces in a secure chest',
})
