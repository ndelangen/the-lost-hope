import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Gambit',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'mixed',
  classic: false,
  text: 'You gain the ability to reroll one die roll per long rest. However, you must also reroll one successful attack roll, saving throw, or ability check per long rest (the DM chooses which).',
  benefit: 'Reroll one die per long rest',
  drawback: 'Must also reroll one success per long rest',
})
