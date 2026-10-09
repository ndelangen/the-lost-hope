import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Grimgor's Bloodied Bandages",
  icon: 'gi/GiBandageRoll',
  currentOwner: refs.organizations.church_of_gruumsh,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'Old bloodstained bandages preserved as relics of ',
      refs.npcs.grimgor_the_bloody,
      '. Their exact battle of origin is unknown.',
    ],
  ],
})
