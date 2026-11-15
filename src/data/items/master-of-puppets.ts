import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Master of Puppets',
  icon: 'gi/GiPuppet',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A flying battle-cruiser of the ',
      refs.organizations.tempest_family,
      ' and the flagship of ',
      refs.npcs.onana_tempest,
      '.',
    ],
  ],
})
