import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Dagger of the Zodiac Signs',
  icon: 'gi/GiBroadDagger',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [
    [
      'A divine dagger bound to the person who accepts it. It held the core magic of the ',
      refs.locations.temple_of_the_serpent_eclipse,
      '. Its remaining powers are not yet recorded.',
    ],
  ],
})
