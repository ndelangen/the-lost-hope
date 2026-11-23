import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Sun',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: true,
  text: 'You gain 50,000 XP, and a wondrous item (which the DM determines randomly) appears in your hands.',
  benefit: '50,000 XP and wondrous item',
})
