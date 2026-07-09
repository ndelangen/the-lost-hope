import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Pirate asks the dragon children to fly the party down',
  date: new Date('2026-08-17T21:00'),
  location: refs.locations.mountain_top,
  mark: { type: 'icon', name: 'gi/GiFeather' },
  parts: [
    [
      'The pirate PC (',
      refs.pcs.swift_starblade,
      ') had the audacity to ask if the ',
      refs.npcs.dragon_children,
      ' might fly the party down the mountain.',
    ],
    'On a natural 20, all party members got to fly a dragon down.',
    'Note (improbable outcome): a natural-20 outcome for 5 PCs is strong DM fiat — recorded as stated.',
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.revin_grumblefist,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
    ],
  ],
})
