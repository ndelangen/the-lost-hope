import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Roberto’s Map Pages',
  icon: 'fa/FaAtlas',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [
    [
      'Magical pages taken from ',
      refs.npcs.roberto,
      '’s map book that provide two-way written communication with ',
      refs.organizations.the_eyeless_hand,
      '.',
    ],
    [
      refs.events.n2_e122,
      ': when ',
      refs.pcs.jim,
      ' read the pages at the inn on Nimbus, a message showed that the Eyeless Hand was again aware of his location. Whether the pages revealed it remains unknown.',
    ],
  ],
})
