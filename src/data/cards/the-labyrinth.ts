import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Labyrinth',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'mixed',
  classic: false,
  text: 'You gain advantage on all checks to navigate and find hidden passages. However, you become lost and confused in open spaces, having disadvantage on all checks while not in an enclosed structure or dungeon.',
  benefit: 'Advantage on navigation in enclosed spaces',
  drawback: 'Disadvantage on checks in open spaces',
})
