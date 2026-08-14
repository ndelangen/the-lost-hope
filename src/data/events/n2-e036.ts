import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The dwarf and the pirate go missing',
  day: 9,
  location: refs.locations.badesh_forest,
  mark: { type: 'icon', name: 'fa/FaUsersSlash' },
  notes: [
    ['After the flight down, the party landed near a forest.'],
    [refs.pcs.revin_grumblefist, ' and ', refs.pcs.swift_starblade, ' went missing.'],
    [
      'The party presumed both were eaten by the ',
      refs.beasts.dragon_children,
      ' — something threatened on the mountain.',
    ],
    [
      refs.pcs.swift_starblade,
      ' returned in a later session — per his sheet he flew to another place.',
    ],
    [
      refs.pcs.revin_grumblefist,
      "'s player left the group. The DM may reuse ",
      refs.pcs.revin_grumblefist,
      ' as an NPC or reference him later, but has not done so; his disappearance will most likely remain unresolved.',
    ],
  ],
})
