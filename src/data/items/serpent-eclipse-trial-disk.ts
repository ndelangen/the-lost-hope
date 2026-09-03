import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Serpent Eclipse Trial Disk',
  icon: 'gi/GiMetalDisc',
  currentOwner: refs.organizations.beasts_and_dwarf,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'The transformed form of the ',
      refs.items.purple_dragon_horn,
      ', rewarded for the first completed challenge in the ',
      refs.locations.temple_of_the_serpent_eclipse,
      '. Returning it to the altar closes the door to that completed challenge.',
    ],
  ],
})
