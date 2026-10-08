import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: "Grimgor's Skull Breaker",
  icon: 'gi/GiMagicAxe',
  currentOwner: refs.npcs.sarogarth,
  carriedBy: refs.npcs.sarogarth,
  craftedBy: null,
  notes: [
    [
      'An extending axe associated with ',
      refs.npcs.grimgor_the_bloody,
      '. Purple and green lightning crackles along its blade. It returns to its bearer when thrown away.',
    ],
  ],
})
