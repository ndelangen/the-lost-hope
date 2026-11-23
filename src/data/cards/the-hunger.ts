import { refs } from '#/data/generated/refs.ts'
import { create as createCard } from '#/definitions/card.ts'

export default createCard({
  name: 'The Hunger',
  deck: refs.items.deck_of_many_more_things,
  suit: 'Ruin',
  tone: 'mixed',
  classic: false,
  text: 'You gain the ability to consume the life force of others. As an action, you can deal 1d6 necrotic damage to a creature within 5 feet and regain half that amount as hit points. However, you must use this ability at least once per day or suffer 2d6 necrotic damage yourself.',
  benefit: 'Drain life to heal',
  drawback: 'Must use daily or take damage',
})
