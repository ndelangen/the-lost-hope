import { refs } from '#/data/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Mountain and the Dragon Family',
  date: new Date('2026-08-16'),
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
  ],
})
