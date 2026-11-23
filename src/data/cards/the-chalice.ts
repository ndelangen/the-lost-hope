import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Chalice',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Star',
  tone: 'good',
  classic: false,
  text: 'You gain the ability to heal yourself or another creature for 2d8 + your Constitution modifier hit points once per short rest. This ability lasts until you use it a total of 7 times.',
  benefit: 'Heal 2d8+CON mod once per short rest (7 uses total)',
})
