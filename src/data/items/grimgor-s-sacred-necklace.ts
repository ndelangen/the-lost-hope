import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Grimgor's Sacred Necklace",
  icon: 'gi/GiTribalPendant',
  currentOwner: refs.organizations.church_of_gruumsh,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A protection charm and holy relic associated with ',
      refs.npcs.grimgor_the_bloody,
      '. It incorporates trophies from dragons and minotaurs.',
    ],
  ],
})
