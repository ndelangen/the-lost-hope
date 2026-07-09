import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Children's laughter outside",
  date: new Date('2026-08-09T23:30'),
  location: refs.locations.the_nest,
  mark: { type: 'icon', name: 'gi/GiGhost' },
  parts: [
    "The party heard children's laughter outside. Evil.",
    [
      'After saving ',
      refs.pcs.revin_grumblefist,
      ' from the tentacles, the party closed the window. The laughter followed.',
    ],
    'The PCs went back to their rooms to sleep.',
    ['Party: ', refs.pcs.jim, ', ', refs.pcs.william_greenhove, ', ', refs.pcs.revin_grumblefist],
  ],
})
