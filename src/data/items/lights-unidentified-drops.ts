import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Light’s Unidentified Drops',
  icon: 'fa/FaPrescriptionBottleAlt',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [
    [
      'A small bottle of unidentified drops supplied by ',
      refs.npcs.light_13th_marshal,
      '. Their full purpose and composition are unknown.',
    ],
    [refs.pcs.jim, ' never returned the bottle and still carries an unknown but nonzero amount.'],
  ],
})
