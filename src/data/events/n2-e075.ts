import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Roberto’s maps reveal the Father’s order to find Jim alive',
  day: 15,
  location: refs.locations.verdant_haven,
  mark: { type: 'icon', name: 'gi/GiSecretBook' },
  notes: [
    [
      'On the party’s second day in ',
      refs.locations.verdant_haven,
      ', ',
      refs.pcs.devan,
      ' persuaded ',
      refs.npcs.roberto,
      ' to give the party ',
      refs.items.robertos_map_pages,
      ' so they could make maps for him while he recovered.',
    ],
    [
      refs.pcs.swift_starblade,
      ' drew a flattering picture of himself on one page. When ',
      refs.pcs.jim,
      ' touched ',
      refs.items.robertos_map_pages,
      ', a letter from ',
      refs.npcs.the_father,
      ' appeared.',
    ],
    [
      'The letter ordered all ',
      refs.organizations.the_eyeless_hand,
      ' personnel to search for ',
      refs.pcs.jim,
      ', return him alive, and not hurt him.',
    ],
    [
      'The exchange revealed that ',
      refs.npcs.roberto,
      ' was a minor member of ',
      refs.organizations.the_eyeless_hand,
      ' and that ',
      refs.items.robertos_map_pages,
      ' provided two-way communication with the organization.',
    ],
  ],
})
