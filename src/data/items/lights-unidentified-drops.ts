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
      'An empty bottle that contained unidentified drops supplied by ',
      refs.npcs.light_13th_marshal,
      '. Their full purpose and composition are unknown.',
    ],
  ],
})
