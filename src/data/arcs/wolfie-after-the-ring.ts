import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Wolfie and Cassian’s ring',
  icon: 'gi/GiWolfHowl',
  direction: [
    [
      'What has the ring made of ',
      refs.pcs.cassian_veyl,
      ' and ',
      refs.beasts.wolfie,
      ', and what does Wolfie want now?',
    ],
  ],
  plots: [
    {
      name: 'Stolen pups',
      status: 'closed',
      events: [refs.events.n2_e051, refs.events.n2_e053],
    },
    {
      name: 'The ring’s hunger',
      status: 'closed',
      npcs: [refs.npcs.bob_the_merchant, refs.npcs.gruumsh_high_priest],
      events: [
        refs.events.n2_e095,
        refs.events.n2_e111,
        refs.events.n2_e131,
        refs.events.n2_e133,
        refs.events.n2_e134,
      ],
    },
    {
      name: 'Cassian understands Wolfie',
      status: 'closed',
      events: [refs.events.n2_e138],
    },
    {
      name: 'What Wolfie has become',
      hook: [
        [
          '',
          refs.beasts.wolfie,
          ' walks and talks now. What does he ask of ',
          refs.pcs.cassian_veyl,
          ' first?',
        ],
      ],
      scene: refs.scenes.wolfie_wants_solid_ground,
      events: [refs.events.n2_e204],
    },
  ],
})
