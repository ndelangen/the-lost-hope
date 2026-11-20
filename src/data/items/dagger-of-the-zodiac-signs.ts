import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Dagger of the Zodiac Signs',
  icon: 'gi/GiBroadDagger',
  currentOwner: refs.pcs.auren,
  carriedBy: refs.pcs.auren,
  craftedBy: null,
  notes: [
    [
      'A divine dagger bound to the person who accepts it. It was the heart and magical core of the ',
      refs.locations.temple_of_the_serpent_eclipse,
      ', a sentient plane that depended on the dagger to survive. It fuses into the accepting bearer’s arm and cannot simply be removed or handed to someone else. Its remaining powers are not yet recorded.',
    ],
  ],
})
