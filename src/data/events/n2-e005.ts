import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'William diverts to a tavern',
  day: 1,
  location: refs.locations.the_nest,
  mark: { type: 'icon', name: 'fa/FaBeer' },
  notes: [
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
