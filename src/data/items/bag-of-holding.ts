import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Bag of Holding',
  icon: 'gi/GiBackpack',
  currentOwner: refs.pcs.cassian_veyl,
  carriedBy: refs.pcs.cassian_veyl,
  craftedBy: null,
  notes: [
    [
      'A blue, ocean-like bag with a brown lower section, bought from ',
      refs.npcs.bob_the_merchant,
      ' for 5,000 GP. It now holds the party’s shared supplies.',
    ],
    [
      'There is no breathable air inside the bag, so creatures placed within it will suffocate. ',
      refs.npcs.bob_the_merchant,
      ' warned the party not to cast spells into it.',
    ],
    ['Bob said the bag has an additional random effect that has not yet been determined.'],
  ],
})
