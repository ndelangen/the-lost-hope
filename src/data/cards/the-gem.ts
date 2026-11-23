import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Gem',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'good',
  classic: true,
  text: 'Twenty-five pieces of jewelry worth 2,000 gp each or fifty gems worth 1,000 gp each appear at your feet.',
  benefit: '50,000 gp worth of jewelry or gems',
})
