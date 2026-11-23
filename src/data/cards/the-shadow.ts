import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Shadow',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'mixed',
  classic: false,
  text: 'You gain resistance to necrotic damage and the ability to become invisible once per long rest for up to 1 hour. However, you also become vulnerable to radiant damage and take 1d6 radiant damage whenever you start your turn in direct sunlight.',
  benefit: 'Necrotic resistance, invisibility once per long rest',
  drawback: 'Vulnerable to radiant, damage in sunlight',
})
