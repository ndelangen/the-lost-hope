import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Pulse and the Boarding',
  number: 18,
  date: new Date('2026-11-19'),
  icon: 'gi/GiBlast',
  events: [
    refs.events.n2_e206,
    refs.events.n2_e207,
    refs.events.n2_e208,
    refs.events.n2_e209,
    refs.events.n2_e210,
    refs.events.n2_e211,
    refs.events.n2_e212,
    refs.events.n2_e213,
    refs.events.n2_e214,
    refs.events.n2_e215,
    refs.events.n2_e216,
    refs.events.n2_e217,
    refs.events.n2_e218,
    refs.events.n2_e219,
    refs.events.n2_e220,
    refs.events.n2_e221,
    refs.events.n2_e222,
  ],
})
