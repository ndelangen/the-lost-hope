import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Session 9',
  number: 9,
  date: new Date('2026-07-02'),
  events: [],
  notes: [['No fictional events or attendance notes have been supplied yet.']],
})
