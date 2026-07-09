import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'William diverts to a tavern',
  date: new Date('2026-08-09T16:00'),
  location: refs.locations.the_nest,
  mark: { type: 'icon', name: 'fa/FaBeer' },
  parts: [
    [
      'The party was supposed to go straight to the ',
      refs.locations.fajanet_guildhall,
      ', but ',
      refs.pcs.william_greenhove,
      ' diverted to ',
      refs.locations.the_nest,
      ' — a tavern where ',
      refs.npcs.samantha,
      ' trades illegal/semi-illegal drugs (Eyeless Hand). The party followed.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
