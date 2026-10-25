import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Tempest Bargain',
  number: 16,
  date: new Date('2026-10-22'),
  icon: 'gi/GiShipWheel',
  events: [
    refs.events.n2_e166,
    refs.events.n2_e167,
    refs.events.n2_e168,
    refs.events.n2_e169,
    refs.events.n2_e170,
    refs.events.n2_e171,
    refs.events.n2_e172,
    refs.events.n2_e173,
    refs.events.n2_e174,
    refs.events.n2_e175,
    refs.events.n2_e176,
    refs.events.n2_e177,
    refs.events.n2_e178,
    refs.events.n2_e179,
    refs.events.n2_e180,
    refs.events.n2_e181,
    refs.events.n2_e182,
    refs.events.n2_e183,
    refs.events.n2_e184,
  ],
})
