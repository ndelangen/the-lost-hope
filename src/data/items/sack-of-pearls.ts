import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Sack of Pearls',
  icon: 'gi/GiOysterPearl',
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A sack of pearls from the people of ',
      refs.locations.the_caves_of_steel,
      ', given in thanks for a story. Each pearl is worth 50 gp. A perfect story earns a sack of 20.',
    ],
    ['They can be sold as they are, or perhaps one day made into something magical, somewhere.'],
  ],
})
