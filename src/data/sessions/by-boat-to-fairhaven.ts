import { refs } from '#/data/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'By Boat to Fairhaven',
  date: new Date('2026-08-19'),
  events: [refs.events.n2_e041, refs.events.n2_e042, refs.events.n2_e043],
})
