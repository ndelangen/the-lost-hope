import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Starlight',
  icon: 'gi/GiFallingStar',
  currentOwner: refs.organizations.tempest_family,
  carriedBy: null,
  craftedBy: null,
  notes: [['A flying battle-cruiser of the ', refs.organizations.tempest_family, '.']],
  background: [
    [
      'Destroyed off-screen in the fleet war between the ',
      refs.organizations.tempest_family,
      ' and ',
      refs.organizations.the_eyeless_hand,
      '.',
    ],
  ],
})
