import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The flying fortress',
  direction: [['Why does the second smoke trail point at a flying fortress, and who is aboard?']],
  sessions: [refs.sessions.the_ghost_and_the_gambler],
  plots: [
    {
      name: 'Reaching the fortress',
      hook: [['', refs.pcs.jim, ' cannot cross by ferry while he looks like a ghost.']],
      scene: refs.scenes.stealing_a_ship_from_the_harbour,
      events: [refs.events.n2_e203],
    },
  ],
})
