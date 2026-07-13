import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Fall of Fairhaven',
  number: 8,
  icon: 'gi/GiCastleRuins',
  date: new Date('2026-06-04'),
  events: [
    refs.events.n2_e065,
    refs.events.n2_e066,
    refs.events.n2_e067,
    refs.events.n2_e068,
    refs.events.n2_e069,
    refs.events.n2_e070,
  ],
  notes: [
    [
      'Felicity joined as ',
      refs.pcs.theron,
      ', a new player character. Ryan played ',
      refs.pcs.victor_dranzig,
      '.',
    ],
  ],
})
