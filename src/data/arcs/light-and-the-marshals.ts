import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Light and the marshals',
  icon: 'gi/GiHeraldicSun',
  direction: [
    [
      'What is ',
      refs.npcs.light_13th_marshal,
      ' using the party for, and who are the other marshals?',
    ],
  ],
  notes: [
    [
      'The hidden truth behind this arc lives on ',
      refs.npcs.light_13th_marshal,
      ': what he wants, what he is, and why he calls himself a necessary evil.',
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
      events: [refs.events.n2_e217],
      notes: [
        [
          'The farewell from ',
          refs.pcs.jim,
          ' warns the party not to trust ',
          refs.npcs.light_13th_marshal,
          '. It supplies no proof of the hidden plans in the DM background.',
        ],
      ],
    },
    {
      name: 'Why is nobody asking?',
      hook: [
        [
          refs.npcs.hex,
          ' cannot watch the party go on simple adventures any longer. Do they hear the question inside the taunt?',
        ],
      ],
      scene: refs.scenes.hex_loses_patience,
    },
    {
      name: 'A booth that does not answer',
      hook: [
        [
          'The booth of the ',
          refs.locations.rustmoor_guildhall,
          ' has no connection to ',
          refs.locations.fajanet,
          ' yet. How far down into ',
          refs.locations.the_old_battlefield,
          ' does the party go to speed it up?',
        ],
      ],
      scene: refs.scenes.down_through_the_rubble,
    },
    {
      name: 'The first part of the test',
      hook: [
        [
          refs.npcs.light_13th_marshal,
          ' explains nothing until he is asked. What does the party ask him, and what do they do with the answers?',
        ],
      ],
      scene: refs.scenes.questions_for_light,
    },
  ],
})
