import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Devan's Plate Armour",
  icon: 'gi/GiBreastplate',
  currentOwner: refs.pcs.devan,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A commissioned suit of +1 plate armour, fitted by ',
      refs.npcs.bessy,
      '. It has not yet been collected.',
    ],
  ],
})
