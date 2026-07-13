import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Roberto’s maps reveal the Father’s order to find Jim alive',
  day: 15,
  location: refs.locations.verdant_haven,
  mark: { type: 'icon', name: 'gi/GiSecretBook' },
  notes: [
    [
      refs.npcs.roberto,
      ' was a mapmaker carrying a book full of detailed maps. ',
      refs.pcs.devan,
      ' persuaded him to give the party several pages so they could make maps for him while he recovered.',
    ],
    [
      refs.pcs.swift_starblade,
      ' drew a flattering picture of himself on one page. When ',
      refs.pcs.jim,
      ' touched the pages, a letter from ',
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
      ' and that his book and pages provided two-way communication with the organization.',
    ],
  ],
})
