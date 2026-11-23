import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Dragon',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'good',
  classic: false,
  text: 'A young dragon of a color determined by the DM becomes your ally. It serves you loyally and will fight by your side. The dragon matures normally and its loyalty remains even after it reaches adulthood.',
  benefit: 'Gain a young dragon as a permanent ally',
})
