import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Blight',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'bad',
  classic: false,
  text: 'All plants within 1 mile of you wither and die. Animals and beasts are instinctively hostile toward you, attacking on sight. This effect is permanent and marks you as cursed.',
  drawback: 'Plants die nearby, animals become hostile',
})
