import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Arrival in Fajanet',
  number: 1,
  icon: 'gi/GiOpenGate',
  date: new Date('2026-01-29'),
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
  ],
})
