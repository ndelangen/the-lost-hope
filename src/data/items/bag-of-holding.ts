import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Bag of Holding',
  icon: 'gi/GiBackpack',
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A blue, ocean-like Bag of Holding with a brown lower section, distinct from ',
      refs.items.cassian_s_replacement_bag_of_holding,
      '.',
    ],
    [
      'The inside of the bag is a vacuum, and time is frozen. Creatures inside experience no elapsed time, so they do not suffocate while time is stopped. ',
      refs.npcs.bob_the_merchant,
      ' warned the party not to cast spells into it.',
    ],
    [
      refs.npcs.bob_the_merchant,
      ' said the bag has an additional random effect that has not yet been determined.',
    ],
    [
      {
        type: 'link',
        label: 'Standard Bag of Holding rules on D&D Beyond',
        url: 'https://www.dndbeyond.com/magic-items/4581-bag-of-holding',
      },
    ],
  ],
})
