import { refs } from '#/data/generated/refs.ts'
import { create as createSession } from '#/definitions/session.ts'

export default createSession({
  name: 'The First Dungeon',
  number: 13,
  icon: 'gi/GiSnakeTotem',
  date: new Date('2026-08-13'),
  events: [
    refs.events.n2_e123,
    refs.events.n2_e124,
    refs.events.n2_e125,
    refs.events.n2_e126,
    refs.events.n2_e127,
    refs.events.n2_e128,
    refs.events.n2_e129,
    refs.events.n2_e130,
    refs.events.n2_e131,
    refs.events.n2_e132,
    refs.events.n2_e133,
    refs.events.n2_e134,
  ],
})
