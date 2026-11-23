import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Key',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'good',
  classic: true,
  text: 'A rare or rarer magic weapon with which you are proficient appears in your hands. The DM chooses the weapon.',
  benefit: 'Rare or rarer magic weapon',
})
