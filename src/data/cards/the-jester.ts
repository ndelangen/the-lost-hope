import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Jester',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Jester',
  tone: 'good',
  classic: true,
  text: 'You gain 10,000 XP, or you can draw two additional cards beyond your declared draws.',
  benefit: '10,000 XP or draw 2 additional cards',
  extraDraws: 'May draw two more cards instead of the XP.',
})
