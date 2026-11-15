import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Ride the Lightning',
  icon: 'gi/GiGalleon',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  notes: [['A flying battle-cruiser of the ', refs.organizations.tempest_family, '.']],
  background: [
    [
      'Its crew answers to ',
      refs.organizations.the_eyeless_hand,
      '. It is the cruiser the party is asked to take back.',
    ],
  ],
})
