import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Pocket Holy Text of Grimgor',
  icon: 'gi/GiBookmarklet',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [
    [
      'An iron-bound pocket edition of the ',
      refs.organizations.church_of_gruumsh,
      "'s holy text, including the deeds of ",
      refs.npcs.grimgor_the_bloody,
      '. It is still large enough to serve as a bludgeon.',
    ],
  ],
})
