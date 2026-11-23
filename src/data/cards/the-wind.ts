import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Wind',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: false,
  text: 'You gain a flying speed equal to your walking speed. This speed lasts for one year. You can end this effect early as a bonus action if you choose.',
  benefit: 'Flying speed equal to walking speed for one year',
})
