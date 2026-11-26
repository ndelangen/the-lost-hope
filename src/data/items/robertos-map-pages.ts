import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Roberto’s Map Pages',
  icon: 'fa/FaAtlas',
  category: 'Other',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: refs.pcs.swift_starblade,
  craftedBy: null,
  notes: [
    [
      'Magical pages taken from ',
      refs.npcs.roberto,
      '’s map book that provide two-way written communication with ',
      refs.organizations.the_eyeless_hand,
      '.',
    ],
    ["Whether the pages can reveal their reader's location remains unknown."],
  ],
})
