import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The flying fortress',
  direction: [['Why does the second smoke trail point at a flying fortress, and who is aboard?']],
  plots: [
    {
      name: 'An island in the sky',
      status: 'closed',
      events: [refs.events.n2_e090],
    },
    {
      name: 'The second smoke trail',
      status: 'closed',
      npcs: [refs.npcs.sarogarth],
      events: [refs.events.n2_e178, refs.events.n2_e203],
    },
    {
      name: 'Reaching the fortress',
      hook: [['', refs.pcs.jim, ' cannot cross by ferry while he looks like a ghost.']],
      scene: refs.scenes.stealing_a_ship_from_the_harbour,
    },
  ],
})
