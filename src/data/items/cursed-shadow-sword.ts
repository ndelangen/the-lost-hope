import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Cursed Shadow Sword',
  icon: 'gi/GiSwordWound',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [
    [
      'A shadow-bearing sword whose curse was removed by a high priest of the ',
      refs.organizations.church_of_gruumsh,
      ' during ',
      refs.events.n2_e132,
      '. What became of the extracted curse and the deadly shadow formerly bound to the blade remains unknown.',
    ],
  ],
})
