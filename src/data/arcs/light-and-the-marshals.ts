import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Light and the marshals',
  direction: [
    [
      'What is ',
      refs.npcs.light_13th_marshal,
      ' using the party for, and who are the other marshals?',
    ],
  ],
  quests: [refs.quests.who_is_light],
  plots: [
    {
      name: 'Recruited by the guild',
      status: 'closed',
      npcs: [refs.npcs.light_13th_marshal],
      events: [refs.events.n2_e002, refs.events.n2_e010, refs.events.n2_e011, refs.events.n2_e021],
    },
    {
      name: 'Light’s trapdoor',
      status: 'closed',
      npcs: [refs.npcs.light_13th_marshal],
      events: [refs.events.n2_e026, refs.events.n2_e027, refs.events.n2_e028],
    },
    {
      name: 'Light sends Cassian',
      status: 'closed',
      npcs: [refs.npcs.light_13th_marshal],
      events: [refs.events.n2_e077],
    },
    {
      name: 'Worshippers of the 12th Marshal',
      status: 'closed',
      npcs: [refs.npcs.the_12th_marshal],
      events: [refs.events.n2_e079],
    },
    {
      name: 'Light’s bidding',
      hook: [
        [
          '',
          refs.pcs.cassian_veyl,
          ' still answers to ',
          refs.npcs.light_13th_marshal,
          '. What does Light ask of him next?',
        ],
      ],
      npcs: [refs.npcs.light_13th_marshal],
    },
  ],
})
