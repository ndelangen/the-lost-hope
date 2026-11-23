import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Throne',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'mixed',
  classic: true,
  text: 'You gain proficiency in the Persuasion skill, and you double your proficiency bonus on checks made with that skill. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently in the hands of monsters, which you must clear out before you can claim the keep as yours.',
  benefit: 'Proficiency in Persuasion (double) and ownership of a keep',
  drawback: 'Keep is occupied by monsters',
})
