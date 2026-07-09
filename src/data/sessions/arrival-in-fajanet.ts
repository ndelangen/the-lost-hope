import { refs } from '#/data/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Arrival in Fajanet',
  date: new Date('2026-08-09'),
  events: [
    refs.events.n2_e001,
    refs.events.n2_e002,
    refs.events.n2_e003,
    refs.events.n2_e004,
    refs.events.n2_e005,
    refs.events.n2_e006,
    refs.events.n2_e007,
    refs.events.n2_e008,
    refs.events.n2_e009,
    refs.events.n2_e010,
    refs.events.n2_e011,
    refs.events.n2_e012,
  ],
})
