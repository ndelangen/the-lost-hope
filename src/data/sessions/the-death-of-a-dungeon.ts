import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Death of a Dungeon',
  number: 15,
  icon: 'gi/GiFloatingCrystal',
  date: new Date('2026-10-08'),
  notes: [[refs.pcs.cassian_veyl, "'s player was absent for this session."]],
  events: [
    refs.events.n2_e149,
    refs.events.n2_e150,
    refs.events.n2_e151,
    refs.events.n2_e152,
    refs.events.n2_e153,
    refs.events.n2_e154,
    refs.events.n2_e155,
    refs.events.n2_e156,
    refs.events.n2_e157,
    refs.events.n2_e158,
    refs.events.n2_e159,
    refs.events.n2_e160,
    refs.events.n2_e161,
    refs.events.n2_e162,
    refs.events.n2_e163,
    refs.events.n2_e164,
  ],
})
