import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Fiddler’s Game',
  number: 12,
  icon: 'gi/GiCardRandom',
  date: new Date('2026-08-06'),
  events: [
    refs.events.n2_e104,
    refs.events.n2_e111,
    refs.events.n2_e105,
    refs.events.n2_e112,
    refs.events.n2_e113,
    refs.events.n2_e114,
    refs.events.n2_e115,
    refs.events.n2_e107,
    refs.events.n2_e116,
    refs.events.n2_e117,
    refs.events.n2_e118,
    refs.events.n2_e108,
    refs.events.n2_e106,
    refs.events.n2_e119,
    refs.events.n2_e120,
  ],
})
