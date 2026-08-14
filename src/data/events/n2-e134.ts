import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian learns the ring is turning him into a werewolf',
  day: 21,
  location: refs.locations.gruumsh_temple_library,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      'Research in the ',
      refs.locations.gruumsh_temple_library,
      ' made clear that the ',
      refs.items.wolfie_tracking_ring,
      ' was gradually transforming ',
      refs.pcs.cassian_veyl,
      ' into a werewolf-like hybrid rather than merely making him hungry.',
    ],
    [
      'The ring had opened a two-way bond between Cassian’s soul and ',
      refs.beasts.wolfie,
      '. Cassian’s craving for meat and heightened animal scent were already evident; claws, fangs, and increased hair were identified as further signs of the transformation.',
    ],
    [
      'The exact full-moon effects, sensitivity to silver, degree of control, and consequences for Wolfie remained unknown.',
    ],
  ],
})
