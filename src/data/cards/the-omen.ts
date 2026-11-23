import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Omen',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'mixed',
  classic: false,
  text: 'You are marked by dark fate. The next three times you would drop to 0 hit points, you instead drop to 1 hit point but suffer one level of exhaustion. After this has happened three times, the mark fades.',
  benefit: 'Survive three lethal hits with 1 HP',
  drawback: 'Gain exhaustion each time, then mark fades',
})
