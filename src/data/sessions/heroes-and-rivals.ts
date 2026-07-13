import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Heroes and Rivals',
  number: 7,
  icon: 'gi/GiCrossedSwords',
  date: new Date('2026-05-07'),
  events: [
    refs.events.n2_e046,
    refs.events.n2_e063,
    refs.events.n2_e064,
    refs.events.n2_e058,
    refs.events.n2_e059,
  ],
  notes: [
    [
      refs.pcs.jim,
      ', ',
      refs.pcs.devan,
      ', and ',
      refs.pcs.swift_starblade,
      ' were confirmed present for this session.',
    ],
    [
      'Ryan played ',
      refs.pcs.victor_dranzig,
      '. Eefiene played ',
      refs.pcs.fix,
      ' as an occasional PC.',
    ],
  ],
})
