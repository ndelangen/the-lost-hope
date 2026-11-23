import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Fool',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Jester',
  tone: 'good',
  classic: true,
  text: 'You permanently increase your Dexterity score by 1. You can draw one additional card beyond your declared draws.',
  benefit: 'Permanent +1 Dexterity, draw an extra card',
  extraDraws: 'Draw one more card.',
})
