import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Champion',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Key',
  tone: 'mixed',
  classic: false,
  text: 'You gain a +1 bonus to all attack rolls and damage rolls. However, enemies are drawn to your power and you have disadvantage on all Stealth checks. Additionally, hostile creatures within 60 feet have advantage on Perception checks to detect you.',
  benefit: '+1 to attack and damage rolls',
  drawback: 'Disadvantage on Stealth, easier to detect',
})
