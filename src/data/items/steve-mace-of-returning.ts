import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Steve, Mace of Returning',
  icon: 'gi/GiMaceHead',
  currentOwner: refs.pcs.devan,
  carriedBy: refs.pcs.devan,
  craftedBy: refs.npcs.bessy,
  notes: [
    [
      'The transformed form of ',
      refs.items.steve_the_interrogation_rock,
      ', now a magical returning weapon with a polished obsidian head, an ancient-bark haft, and faint crimson veins.',
    ],
    ['Uncommon weapon (mace), requires attunement.'],
    [
      'It deals 1d10 ',
      refs.rules.bludgeoning,
      ' damage one-handed, with a +1 bonus to attack and damage rolls, and counts as magical for overcoming ',
      refs.rules.resistance,
      ' and ',
      refs.rules.immunity,
      ' to nonmagical attacks.',
    ],
    [
      'Returning: it can be thrown (range 20/60 ft.), and immediately after the attack, hit or miss, it returns to its wielder’s free hand.',
    ],
    [
      'Heavy Momentum: after using Returning, its wielder can’t use it again until the start of their next turn.',
    ],
  ],
})
