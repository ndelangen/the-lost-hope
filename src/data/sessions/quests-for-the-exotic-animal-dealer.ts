import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Quests for the Exotic Animal Dealer',
  date: new Date('2026-08-10'),
  events: [
    refs.events.n2_e012,
    refs.events.n2_e013,
    refs.events.n2_e014,
    refs.events.n2_e015,
    refs.events.n2_e016,
    refs.events.n2_e017,
    refs.events.n2_e018,
    refs.events.n2_e019,
    refs.events.n2_e020,
    refs.events.n2_e021,
    refs.events.n2_e022,
  ],
})
