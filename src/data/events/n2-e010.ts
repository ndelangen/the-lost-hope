import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Meet Third Marshal Light at the guildhall',
  day: 2,
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'icon', name: 'fa/FaLandmark' },
  notes: [
    [
      'The party reached the ',
      refs.locations.fajanet_guildhall,
      ' and met the Third Marshal ',
      refs.npcs.third_marshal_light,
      '.',
    ],
    [
      'Light officially offered them membership in the guild. With membership, each new recruit gets one favor from Light.',
    ],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
