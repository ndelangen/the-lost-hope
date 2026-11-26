import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Jim’s Kenku Suit',
  icon: 'gi/GiClothes',
  category: 'Other',
  currentOwner: refs.pcs.swift_starblade,
  carriedBy: null,
  craftedBy: null,
  quantity: 2,
  notes: [
    ['The physical kenku disguise formerly worn by ', refs.pcs.jim, '.'],
    [
      refs.pcs.jim,
      ' started the campaign with three suits. One was burned in ',
      refs.events.n2_e106,
      ' and buried; two remain. What the suits are made of has never been disclosed.',
    ],
  ],
})
