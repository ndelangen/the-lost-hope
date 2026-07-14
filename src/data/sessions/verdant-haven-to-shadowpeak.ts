import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'Verdant Haven to ShadowPeak',
  number: 9,
  icon: 'gi/GiMountainRoad',
  date: new Date('2026-07-02'),
  events: [
    refs.events.n2_e072,
    refs.events.n2_e073,
    refs.events.n2_e088,
    refs.events.n2_e074,
    refs.events.n2_e075,
    refs.events.n2_e076,
    refs.events.n2_e077,
    refs.events.n2_e089,
    refs.events.n2_e078,
    refs.events.n2_e090,
    refs.events.n2_e079,
    refs.events.n2_e080,
  ],
  notes: [
    [
      refs.pcs.victor_dranzig,
      ' and ',
      refs.pcs.theron,
      ' no longer travelled with the party. ',
      refs.pcs.cassian_veyl,
      ' joined during the session as the watcher assigned by ',
      refs.npcs.light_13th_marshal,
      '.',
    ],
  ],
})
