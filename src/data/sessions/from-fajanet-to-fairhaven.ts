import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'From Fajanet to Fairhaven',
  number: 4,
  date: new Date('2026-03-05'),
  events: [
    refs.events.n2_e026,
    refs.events.n2_e027,
    refs.events.n2_e028,
    refs.events.n2_e029,
    refs.events.n2_e030,
    refs.events.n2_e031,
    refs.events.n2_e032,
    refs.events.n2_e033,
    refs.events.n2_e034,
    refs.events.n2_e035,
    refs.events.n2_e036,
    refs.events.n2_e037,
    refs.events.n2_e038,
    refs.events.n2_e039,
    refs.events.n2_e040,
    refs.events.n2_e041,
    refs.events.n2_e042,
    refs.events.n2_e043,
  ],
  notes: [
    [
      'Johan joined as ',
      refs.pcs.swift_starblade,
      ', Niek joined as ',
      refs.pcs.devan,
      ', and Ryan joined as ',
      refs.pcs.victor_the_badesh_lumberjack,
      '.',
    ],
  ],
})
