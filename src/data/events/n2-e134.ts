import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian learns the ring is turning him into a werewolf',
  day: 21,
  location: refs.locations.gruumsh_temple_library,
  mark: { type: 'avatar', of: refs.pcs.cassian_veyl },
  notes: [
    [
      'Research in the ',
      refs.locations.gruumsh_temple_library,
      ' made clear that the ',
      refs.items.ring_of_hunger,
      ' was causing ',
      refs.pcs.cassian_veyl,
      '’s ',
      refs.effects.werewolf_transformation,
      ' through a two-way bond with ',
      refs.beasts.wolfie,
      ', rather than merely making him hungry.',
    ],
  ],
  illustrations: ['/assets/scenes/cassian-learns-the-ring-is-turning-him-into-a-werewolf.png'],
})
