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
  ],
  notes: [
    [
      'The closing sequence reaches Campaign Day 19. The exact number of later days aboard the ship remains unclear.',
    ],
  ],
})
