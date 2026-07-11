import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Zone of truth — each PC questioned',
  day: 9,
  location: refs.locations.mountain_top,
  mark: { type: 'icon', name: 'fa/FaBalanceScale' },
  notes: [
    ['Each character individually entered a zone of truth.'],
    [refs.pcs.jim, ' presented a "letter of passage" given by ', refs.npcs.light_13th_marshal, '.'],
    ['The ', refs.npcs.angel_of_the_mountain, ' burned it.'],
    ['Each character was asked about their personal motives and had to answer truthfully.'],
    [
      'Open: what did the other PCs say? Not stated. The angel burned the letter — what did that mean? Not stated.',
    ],
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
