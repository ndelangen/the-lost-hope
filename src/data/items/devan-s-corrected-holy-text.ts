import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Devan's Corrected Holy Text",
  icon: 'gi/GiSecretBook',
  currentOwner: refs.pcs.devan,
  carriedBy: refs.pcs.devan,
  craftedBy: null,
  notes: [
    [
      'An expanded holy text with corrections by ',
      refs.npcs.sarogarth,
      '. It gives a less exaggerated account of ',
      refs.npcs.grimgor_the_bloody,
      ' and includes details about his parents, sister, and childhood. It remains in the original script.',
    ],
  ],
})
