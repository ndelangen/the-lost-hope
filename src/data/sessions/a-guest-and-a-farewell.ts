import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'A Guest and a Farewell',
  number: 7,
  date: new Date('2026-05-07'),
  events: [],
  notes: [
    [
      'Felicity joined for this session only. It was also the final session Ryan played as ',
      refs.pcs.victor_the_badesh_lumberjack,
      '. Felicity’s character and the fictional events were not supplied.',
    ],
  ],
})
