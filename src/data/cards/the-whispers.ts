import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Whispers',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'You are haunted by voices only you can hear. You have disadvantage on all Wisdom (Perception) and Wisdom (Insight) checks. Additionally, you must make a DC 15 Wisdom saving throw at the start of each day or be unable to benefit from a long rest that day.',
  drawback: 'Disadvantage on Perception/Insight, risk of no rest',
})
