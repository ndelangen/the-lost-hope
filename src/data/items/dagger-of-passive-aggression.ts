import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Dagger of Passive Aggression',
  icon: 'gi/GiDaggerRose',
  currentOwner: refs.pcs.jim,
  carriedBy: refs.pcs.jim,
  craftedBy: null,
  notes: [
    ['A golden magical dagger. A creature stabbed by it becomes conspicuously passive-aggressive.'],
  ],
})
