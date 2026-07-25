import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Fairhaven Shadows',
  number: 5,
  icon: 'gi/GiShadowFollower',
  date: new Date('2026-04-09'),
  events: [refs.events.n2_e044, refs.events.n2_e060, refs.events.n2_e045, refs.events.n2_e083],
  notes: [
    ['Notes for this session were reconstructed by Niek and Ryan.'],
    [
      refs.pcs.jim,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
      ', and ',
      refs.pcs.victor_dranzig,
      ' were confirmed present.',
    ],
    [
      'Niels was absent, but ',
      refs.pcs.william_greenhove,
      ' remained with the group as a carried “minotaur mule.”',
    ],
  ],
})
