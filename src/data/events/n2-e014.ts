import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Enter the tunnel via trapdoor',
  day: 2,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'fa/FaDoorOpen' },
  notes: [
    [
      'The party went through a ',
      refs.locations.trapdoor,
      ' to reach a tunnel — the dealer (or the city) presumably keeps the entrance.',
    ],
    ['The party descended into the tunnel in pursuit of the missing animals.'],
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
