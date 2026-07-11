import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Fairhaven Shadows',
  number: 5,
  date: new Date('2026-04-09'),
  events: [refs.events.n2_e044, refs.events.n2_e045, refs.events.n2_e046],
  notes: [['Notes for this session were reconstructed by Niek and Ryan.']],
})
