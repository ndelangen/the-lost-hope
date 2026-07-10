import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Puzzle room with 5 elements chasing each other',
  day: 9,
  location: refs.locations.puzzle_room,
  mark: { type: 'icon', name: 'gi/GiPuzzle' },
  notes: [
    [
      'The party reached a puzzle room with 5 elements chasing each other. The party solved the puzzle.',
    ],
    [
      'Open: what 5 elements? Not stated. (Likely a classical element set: water, fire, earth, air, aether — but the user did not name them.)',
    ],
    ['Open: how was it solved? Not stated.'],
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
