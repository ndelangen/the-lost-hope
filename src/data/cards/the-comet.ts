import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Comet',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: true,
  text: 'If you single-handedly defeat the next hostile monster or group of monsters you encounter, you gain experience points enough to gain one level. Otherwise, this card has no effect.',
  benefit: 'Gain one level if you solo next encounter',
})
