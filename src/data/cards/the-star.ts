import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Star',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: true,
  text: "Increase one of your Ability Scores by 2. The score can exceed 20 but can't exceed 24.",
  benefit: '+2 to one ability score (max 24)',
})
