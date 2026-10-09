import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Bag of Holding',
  icon: 'gi/GiBackpack',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A blue, ocean-like bag with a brown lower section, bought from ',
      refs.npcs.bob_the_merchant,
      ' for 5,000 GP. It now holds the party’s shared supplies.',
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
  ],
})
