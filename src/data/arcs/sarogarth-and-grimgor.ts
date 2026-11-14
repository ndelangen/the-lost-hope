import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Sarogarth and Grimgor',
  direction: [
    [
      'What does ',
      refs.npcs.sarogarth,
      ' want after waking, and what does ',
      refs.pcs.devan,
      ' owe ',
      refs.npcs.grimgor_the_bloody,
      '?',
    ],
  ],
  quests: [refs.quests.find_grimgor_s_bones],
  plots: [
    {
      name: 'The Gruumsh war temple',
      status: 'closed',
      npcs: [refs.npcs.gruumsh_high_priest],
      events: [refs.events.n2_e130],
    },
    {
      name: 'Sarogarth wakes',
      status: 'closed',
      npcs: [refs.npcs.sarogarth],
      events: [refs.events.n2_e152, refs.events.n2_e154],
    },
    {
      name: 'Grimgor’s relics',
      status: 'closed',
      npcs: [refs.npcs.sarogarth, refs.npcs.grimgor_the_bloody],
      events: [refs.events.n2_e156, refs.events.n2_e157, refs.events.n2_e158, refs.events.n2_e161],
    },
    {
      name: 'Sarogarth’s losses',
      status: 'closed',
      npcs: [refs.npcs.sarogarth, refs.npcs.sylf],
      events: [refs.events.n2_e194, refs.events.n2_e197],
    },
    {
      name: 'South beyond Nimbus',
      hook: [['', refs.pcs.devan, ' senses a direction south of Nimbus. What lies there?']],
      npcs: [refs.npcs.grimgor_the_bloody],
      events: [refs.events.n2_e199],
    },
  ],
})
