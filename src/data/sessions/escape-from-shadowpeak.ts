import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Escape from ShadowPeak',
  number: 10,
  icon: 'gi/GiExitDoor',
  date: new Date('2026-07-09'),
  events: [
    refs.events.n2_e047,
    refs.events.n2_e084,
    refs.events.n2_e048,
    refs.events.n2_e049,
    refs.events.n2_e050,
    refs.events.n2_e051,
    refs.events.n2_e085,
    refs.events.n2_e052,
    refs.events.n2_e053,
    refs.events.n2_e057,
    refs.events.n2_e054,
    refs.events.n2_e055,
    refs.events.n2_e056,
  ],
  notes: [
    [
      'The DM awarded 2 DM tokens each to ',
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.fix,
      ', and ',
      refs.pcs.jim,
      ' for the party’s inventive escape. Johan received none because ',
      refs.pcs.swift_starblade,
      ' was absent. Applying the awards remains an action item.',
    ],
    [
      refs.pcs.swift_starblade,
      ' was away from the party throughout the session. His departure was not explained; the party presumed he traveled on ',
      refs.items.demon_possessed_flying_broom,
      '.',
    ],
    [
      'Swift spent the time at a fan convention or similar gathering, where he gained eight new fans. The exact venue is unknown.',
    ],
  ],
})
