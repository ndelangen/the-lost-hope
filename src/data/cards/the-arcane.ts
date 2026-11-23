import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Arcane',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: false,
  text: 'You gain the ability to cast one 3rd-level spell of your choice once per long rest without expending a spell slot. If you are not a spellcaster, you can cast this spell as if you were a 5th-level spellcaster.',
  benefit: 'Cast one 3rd-level spell once per long rest',
})
