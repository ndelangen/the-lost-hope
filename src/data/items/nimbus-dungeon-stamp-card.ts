import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Nimbus Dungeon Stamp Card',
  icon: 'gi/GiPassport',
  currentOwner: refs.organizations.beasts_and_dwarf,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  quantity: 1,
  notes: [
    [
      'A single stamp card for the party’s first dungeon on ',
      refs.locations.nimbus,
      '. Any wider stamp or reward rules are unknown.',
    ],
  ],
})
