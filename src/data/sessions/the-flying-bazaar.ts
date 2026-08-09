import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The Flying Bazaar',
  number: 11,
  icon: 'gi/GiCargoShip',
  date: new Date('2026-07-23'),
  events: [
    refs.events.n2_e091,
    refs.events.n2_e092,
    refs.events.n2_e093,
    refs.events.n2_e094,
    refs.events.n2_e095,
    refs.events.n2_e097,
    refs.events.n2_e098,
    refs.events.n2_e099,
    refs.events.n2_e100,
    refs.events.n2_e096,
    refs.events.n2_e101,
    refs.events.n2_e110,
  ],
  notes: [
    [
      'Two nights elapsed aboard the ship during this session, bringing the closing sequence to Campaign Day 19. The third night elapsed between sessions, and Session 12 begins on Campaign Day 20.',
    ],
  ],
})
