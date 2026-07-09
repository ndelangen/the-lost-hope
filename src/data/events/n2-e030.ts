import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Reach a cliff with a sign',
  date: new Date('2026-08-17T14:00'),
  location: refs.locations.mountain_cliff,
  mark: { type: 'icon', name: 'fa/FaSign' },
  parts: [
    'The party reached a cliff. There was a sign — the user does not remember what it said.',
    'Open: what did the sign say? Not stated.',
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
