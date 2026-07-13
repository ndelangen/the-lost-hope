import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Fajanet Festival',
  number: 3,
  icon: 'gi/GiPartyFlags',
  date: new Date('2026-02-26'),
  events: [refs.events.n2_e023, refs.events.n2_e024, refs.events.n2_e025],
  notes: [
    [
      refs.pcs.revin_grumblefist,
      "'s player Matthijs left the campaign after this session. Johan and Niek joined for the following session as ",
      refs.pcs.swift_starblade,
      ' and ',
      refs.pcs.devan,
      '.',
    ],
  ],
})
