import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Serpent Eclipse Trial Disk',
  icon: 'gi/GiMetalDisc',
  currentOwner: refs.organizations.beasts_and_dwarf,
  carriedBy: refs.pcs.devan,
  craftedBy: null,
  notes: [
    [
      'The reward from the first completed challenge in the ',
      refs.locations.temple_of_the_serpent_eclipse,
      '. It first appeared as a dragon horn. After a whisper instructed the party to place it on the blood-fed altar, the horn spun and condensed into a metal disk. Its purpose remains unknown.',
    ],
  ],
})
