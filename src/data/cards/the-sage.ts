import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Sage',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: false,
  text: 'You gain proficiency in one skill of your choice and expertise (double proficiency) in that skill. Additionally, you gain advantage on all Intelligence and Wisdom saving throws.',
  benefit: 'Proficiency and expertise in one skill, advantage on Int/Wis saves',
})
