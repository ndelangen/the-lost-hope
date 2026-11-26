import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Sack of Pearls',
  icon: 'gi/GiOysterPearl',
  category: 'Trade Good',
  price: { min: { amount: 50, coin: 'gp' }, max: { amount: 1000, coin: 'gp' } },
  currentOwner: null,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A sack of pearls from the people of ',
      refs.locations.the_caves_of_steel,
      ', given in thanks for a story. The better the story, the fuller the sack: one pearl at least, twenty for a perfect story.',
    ],
    ['They can be sold as they are, or perhaps one day made into something magical, somewhere.'],
  ],
})
