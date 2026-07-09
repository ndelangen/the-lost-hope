import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Lost in the shadow realm',
  date: new Date('2026-08-17T10:00'),
  location: refs.locations.shadow_realm,
  mark: { type: 'icon', name: 'fa/FaMoon' },
  parts: [
    'The party got lost in a shadow realm during a chase.',
    'They hid in a cave.',
    'The phoenix feather cast bright light, guiding the party to safety.',
    'The DM showed what official shadow monster (from the monster manual) they would have fought if the chase had failed.',
    'The phoenix feather burned up and dissolved afterward.',
    ['Open: is this the same phenomenon as session 1 tentacles at ', refs.locations.the_nest, '?'],
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
