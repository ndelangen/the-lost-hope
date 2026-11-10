import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Ghost and the Gambler',
  number: 17,
  date: new Date('2026-11-05'),
  icon: 'gi/GiGhostAlly',
  events: [
    refs.events.n2_e185,
    refs.events.n2_e186,
    refs.events.n2_e187,
    refs.events.n2_e188,
    refs.events.n2_e189,
    refs.events.n2_e190,
    refs.events.n2_e191,
    refs.events.n2_e192,
    refs.events.n2_e193,
    refs.events.n2_e194,
    refs.events.n2_e195,
    refs.events.n2_e196,
    refs.events.n2_e197,
    refs.events.n2_e198,
    refs.events.n2_e199,
    refs.events.n2_e200,
    refs.events.n2_e201,
    refs.events.n2_e202,
    refs.events.n2_e203,
    refs.events.n2_e204,
  ],
})
