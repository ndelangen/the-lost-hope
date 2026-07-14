import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Fairhaven Shadows',
  number: 5,
  icon: 'gi/GiShadowFollower',
  date: new Date('2026-04-09'),
  events: [
    refs.events.n2_e037,
    refs.events.n2_e038,
    refs.events.n2_e039,
    refs.events.n2_e040,
    refs.events.n2_e041,
    refs.events.n2_e042,
    refs.events.n2_e071,
    refs.events.n2_e082,
    refs.events.n2_e043,
  ],
  notes: [['Notes for this session were reconstructed by Niek and Ryan.']],
})
