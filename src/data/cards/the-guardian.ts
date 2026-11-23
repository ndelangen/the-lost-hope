import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Guardian',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'good',
  classic: false,
  text: 'You gain a +2 bonus to your Armor Class. This bonus stacks with other AC bonuses from armor and shields. Additionally, you have advantage on saving throws against being frightened.',
  benefit: '+2 AC (stacking) and advantage vs fear',
})
