import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Mortimer’s shop explodes and the party is arrested',
  day: 13,
  location: refs.locations.mortimer_s_shop,
  mark: { type: 'icon', name: 'gi/GiPrisoner' },
  notes: [
    [
      'Once the party was outside, the shop exploded into the sky. The party was arrested in the aftermath.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
      ', ',
      refs.pcs.victor_dranzig,
      '.',
    ],
  ],
})
