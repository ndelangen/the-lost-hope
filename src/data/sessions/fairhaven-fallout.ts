import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Fairhaven Fallout',
  number: 6,
  icon: 'gi/GiGavel',
  date: new Date('2026-04-30'),
  events: [
    refs.events.n2_e044,
    refs.events.n2_e060,
    refs.events.n2_e061,
    refs.events.n2_e062,
    refs.events.n2_e045,
  ],
  notes: [
    [
      refs.pcs.jim,
      ', ',
      refs.pcs.devan,
      ', and ',
      refs.pcs.swift_starblade,
      ' were confirmed present for the reconstructed alchemist investigation and court scenes.',
    ],
    ['Ryan continued playing ', refs.pcs.victor_dranzig, '.'],
  ],
})
