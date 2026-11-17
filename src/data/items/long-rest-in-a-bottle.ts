import { refs } from '#/data/generated/refs.ts'
import { create as createItem } from '#/definitions/item.ts'

export default createItem({
  name: 'Long Rest in a Bottle',
  icon: 'gi/GiPotionBall',
  currentOwner: refs.npcs.onana_tempest,
  carriedBy: null,
  craftedBy: null,
  notes: [
    [
      'A rare draught from the private reserve of ',
      refs.npcs.onana_tempest,
      '. It takes a minute to work, and then the drinker feels as if they have had a full ',
      refs.rules.long_rest,
      ', with everything that brings. No time passes.',
    ],
  ],
  background: [
    [
      'Brewing it takes mind drups. Mind drups are tapped from a person, and the tapping drains that person’s intelligence for good. That is why it is rare. ',
      refs.npcs.onana_tempest,
      ' only says so when someone asks.',
    ],
  ],
})
