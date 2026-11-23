import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Library',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: false,
  text: 'You gain proficiency with all tools and instruments. Additionally, you can learn one additional language for every 2 levels you have. You instantly learn these languages upon drawing this card.',
  benefit: 'Proficiency with all tools/instruments, bonus languages',
})
