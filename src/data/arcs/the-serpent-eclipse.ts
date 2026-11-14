import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'The Serpent Eclipse dungeon',
  direction: [
    [
      'The party’s first dungeon, sponsored by ',
      refs.npcs.sylvia,
      ', and the price of killing it.',
    ],
  ],
  plots: [
    {
      name: 'Sylvia’s sponsorship',
      status: 'closed',
      npcs: [refs.npcs.sylvia],
      events: [refs.events.n2_e104, refs.events.n2_e120, refs.events.n2_e123],
    },
    {
      name: 'The first descent',
      status: 'closed',
      events: [
        refs.events.n2_e124,
        refs.events.n2_e125,
        refs.events.n2_e126,
        refs.events.n2_e127,
        refs.events.n2_e128,
        refs.events.n2_e129,
      ],
    },
    {
      name: 'The serpent lake',
      status: 'closed',
      events: [
        refs.events.n2_e139,
        refs.events.n2_e140,
        refs.events.n2_e141,
        refs.events.n2_e142,
        refs.events.n2_e143,
        refs.events.n2_e144,
        refs.events.n2_e145,
        refs.events.n2_e146,
        refs.events.n2_e147,
        refs.events.n2_e148,
      ],
    },
    {
      name: 'The death of a dungeon',
      status: 'closed',
      npcs: [refs.npcs.dax, refs.npcs.sarogarth, refs.npcs.sylf],
      events: [
        refs.events.n2_e149,
        refs.events.n2_e150,
        refs.events.n2_e151,
        refs.events.n2_e152,
        refs.events.n2_e154,
        refs.events.n2_e155,
      ],
    },
    {
      name: 'No more dungeon deaths',
      status: 'closed',
      npcs: [refs.npcs.onana_tempest],
      events: [refs.events.n2_e171],
    },
  ],
})
