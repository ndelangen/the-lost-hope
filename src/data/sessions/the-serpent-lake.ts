import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Serpent Lake',
  number: 14,
  icon: 'gi/GiSeaSerpent',
  date: new Date('2026-09-03'),
  events: [
    refs.events.n2_e135,
    refs.events.n2_e136,
    refs.events.n2_e137,
    refs.events.n2_e138,
    refs.events.n2_e139,
    refs.events.n2_e140,
    refs.events.n2_e141,
    refs.events.n2_e142,
    refs.events.n2_e143,
    refs.events.n2_e144,
    refs.events.n2_e145,
    refs.events.n2_e146,
    refs.events.n2_e147,
    refs.events.n2_e148,
  ],
})
