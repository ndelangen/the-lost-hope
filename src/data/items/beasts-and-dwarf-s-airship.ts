import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Beasts and Dwarf's Airship",
  icon: 'gi/GiShipBow',
  currentOwner: refs.organizations.beasts_and_dwarf,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A commissioned airship intended for a small crew, with eight rooms, a kitchen, cargo space, and waterborne capability. Its agreed design uses a rechargeable magical crystal, two cannons, and a retractable four-metre mast.',
    ],
    ['This is a descriptive name; the party has not named the ship.'],
  ],
})
