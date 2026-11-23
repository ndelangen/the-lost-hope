import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Phoenix',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: false,
  text: 'You gain resistance to fire damage and the ability to cast the revivify spell once per long rest without expending a spell slot or material components. This ability lasts until you die and are brought back to life using it.',
  benefit: 'Fire resistance and one free revivify per long rest',
})
