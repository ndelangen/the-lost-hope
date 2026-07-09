import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Return to the guildhall with 2 of 3 animals',
  date: new Date('2026-08-10T19:00'),
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'icon', name: 'fa/FaLandmark' },
  parts: [
    [
      'The party did not have time for the 3rd animal of the quest. They returned to the ',
      refs.locations.fajanet_guildhall,
      ' with 2 of 3 in hand.',
    ],
    'The quest remains open — third animal still missing.',
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
