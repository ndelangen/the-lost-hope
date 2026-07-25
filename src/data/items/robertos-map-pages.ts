import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Roberto’s Map Pages',
  icon: 'fa/FaAtlas',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  notes: [
    [
      'Magical pages taken from ',
      refs.npcs.roberto,
      '’s map book that provide two-way written communication with ',
      refs.organizations.the_eyeless_hand,
      '.',
    ],
  ],
})
