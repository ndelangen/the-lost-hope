import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The flying fortress',
  icon: 'gi/GiElvenCastle',
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
      hook: [
        [
          refs.pcs.jim,
          ' has disappeared and the others now have ',
          refs.items.little_purple,
          '. Can they reach the flying fortress?',
        ],
      ],
      events: [refs.events.n2_e206, refs.events.n2_e209, refs.events.n2_e210],
      notes: [
        [
          'The party did not reach the fortress. The beams were visibly fired from it, but their purpose and the destination of ',
          refs.pcs.jim,
          ' remain unknown to the party.',
        ],
      ],
    },
    {
      name: 'Jim aboard the fortress',
      hook: [
        [
          '',
          refs.npcs.the_father,
          ' holds ',
          refs.pcs.jim,
          ' on the flying fortress. Who remembers him well enough to come looking?',
        ],
      ],
      npcs: [refs.npcs.the_father],
      events: [refs.events.n2_e207, refs.events.n2_e210],
      notes: [
        [
          'Session 18 establishes the pulse and disappearance, not the captor, destination, or survival of ',
          refs.pcs.jim,
          '. Keep the prepared explanation private until play reveals it.',
        ],
      ],
    },
  ],
})
