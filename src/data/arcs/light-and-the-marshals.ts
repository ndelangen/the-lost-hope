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
    ['Hidden truth. The players know none of this yet.'],
    [
      'Writing is remembering. ',
      refs.npcs.light_13th_marshal,
      ' records every use of shadow fuel and Arcane Dust. If he remembers, the users remember, and what he has written down is not lost. That is the paperwork, and it is why he never sleeps.',
    ],
    [
      'The other twelve marshals see him as a thing that has to go on but must never grow too strong. They forced him into a kind of exile: he is not supposed to hold land and may not go wherever he wants. They use the fuel and the drug on purpose to flood him with more records than he can keep.',
    ],
    [
      'He is not really powerful enough for this, and he is looking for a way out. That is why he recruits adventurers.',
    ],
    ['Why he told ', refs.pcs.cassian_veyl, ', and nobody else, that he is a necessary evil:'],
    [
      'He makes the harm sustainable. Because he records the loss, the fuel and the drug cost people less than they should, so the world never has to stop using them. Without him millions would be lost at once. With him it never ends.',
    ],
    [
      'He cannot keep up, so he chooses. Whatever he does not get to is lost, and he decides who is remembered. He lets go of the people nobody will miss.',
    ],
    [
      'What he remembers, he holds. Someone whose self survives in his files partly belongs to him. That is the weight behind his favours and contracts.',
    ],
    [
      'He made ',
      refs.npcs.the_father,
      '. An earlier recruit learned his secret and turned it into a weapon, and he is taking the same risk again with this party.',
    ],
    [
      'Still open: why the twelve cannot simply kill him, and whether the tentacles in ',
      refs.locations.fajanet,
      ' are what takes the people he lets go.',
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
