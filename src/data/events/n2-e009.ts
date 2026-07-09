import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Day 2 — city looks normal',
  date: new Date('2026-08-10T07:00'),
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'fa/FaSun' },
  parts: [
    'The next morning, the city was completely normal. No tentacles, no laughter, no zombies. Just a working morning.',
    'No follow-up action taken by the party.',
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
