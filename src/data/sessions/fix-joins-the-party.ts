import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Fix Joins the Party',
  number: 6,
  date: new Date('2026-04-30'),
  events: [],
  notes: [
    [
      'Ryan continued playing ',
      refs.pcs.victor_the_badesh_lumberjack,
      '. Eefiene joined with ',
      refs.pcs.fix,
      ', a recurring character. No fictional events were supplied for this session.',
    ],
  ],
})
