import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The second smoke trail points to the flying fortress and the party splits',
  notes: [
    [
      'The second black smoke trail led through the harbour toward an approaching flying fortress. The party did not reach it or establish why the ritual pointed there as well as to ',
      refs.npcs.the_fiddler,
      '.',
    ],
    [
      'A ferryman refused to take ',
      refs.pcs.jim,
      ' aboard because he appeared to be a ghost. ',
      refs.pcs.swift_starblade,
      ' stayed with him on ',
      refs.locations.nimbus,
      ', while ',
      refs.pcs.cassian_veyl,
      ' and ',
      refs.pcs.devan,
      ' returned to ',
      refs.locations.skynet,
      ' to check on ',
      refs.beasts.wolfie,
      ' and ',
      refs.npcs.abraham,
      '.',
    ],
    [
      refs.pcs.jim,
      ' and ',
      refs.pcs.swift_starblade,
      " discussed stealing a ship from the harbour to reach the fortress. The session ended before a theft, departure, or arrival. The DM's final travel ruling did not permit ",
      refs.pcs.jim,
      ' to fly freely across the gap merely because he was ethereal.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiFloatingPlatforms' },
})
