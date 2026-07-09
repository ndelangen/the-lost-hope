import { refs } from '#/data/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Dinosaur Chase to Badesh',
  date: new Date('2026-08-17'),
  events: [
    refs.events.n2_e036,
    refs.events.n2_e037,
    refs.events.n2_e038,
    refs.events.n2_e039,
    refs.events.n2_e040,
  ],
})
