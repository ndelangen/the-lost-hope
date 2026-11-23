import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Vessel',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'mixed',
  classic: false,
  text: 'You can store one spell of 5th level or lower in your body, casting it later without expending a spell slot. However, you must store a spell within 24 hours or suffer 2d8 force damage. Once stored, you must cast it within 7 days or it dissipates, dealing 3d8 force damage.',
  benefit: 'Store and cast one 5th-level spell',
  drawback: 'Must store/cast within time limits or take damage',
})
