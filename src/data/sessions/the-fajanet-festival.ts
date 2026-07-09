import { refs } from '#/data/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Fajanet Festival',
  date: new Date('2026-08-11'),
  events: [refs.events.n2_e023, refs.events.n2_e024, refs.events.n2_e025],
})
