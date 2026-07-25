import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Steve, Mace of Returning',
  icon: 'gi/GiMaceHead',
  currentOwner: refs.pcs.devan,
  carriedBy: refs.pcs.devan,
  notes: [
    [
      'The transformed form of ',
      refs.items.steve_the_interrogation_rock,
      ', now a magical returning weapon with a polished obsidian head, an ancient-bark haft, and faint crimson veins.',
    ],
    [
      'It deals 1d10 bludgeoning damage, can be thrown up to 60 feet, returns to a free hand immediately after the attack, and counts as magical against resistance or immunity. Throwing it reduces its wielder’s speed by 5 feet until the next turn.',
    ],
    [
      'On a natural 1, its obsidian head is drawn to the ground after the attack and creatures within 10 feet take 1d10 damage.',
    ],
  ],
})
