import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Bargain',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'mixed',
  classic: false,
  text: 'You gain 25,000 gold pieces, but must immediately pay 5,000 gold pieces to a random NPC or lose all your gold. If you cannot pay, you are hunted by debt collectors until you pay the full amount plus interest.',
  benefit: 'Gain 25,000 gp',
  drawback: 'Must pay 5,000 gp immediately or be hunted',
})
