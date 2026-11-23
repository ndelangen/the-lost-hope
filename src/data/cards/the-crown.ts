import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Crown',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'good',
  classic: false,
  text: 'You gain the ability to speak, read, and write all languages. Additionally, you can cast the tongues spell at will without expending a spell slot.',
  benefit: 'Know all languages, tongues spell at will',
})
