import { refs } from '#/data/generated/refs.ts'
import { create as createArc } from '#/definitions/arc.ts'

export default createArc({
  name: 'Jim and the Eyeless Hand',
  icon: 'gi/GiEyeball',
  direction: [
    [
      'Who is ',
      refs.pcs.jim,
      ' running from, and why does ',
      refs.npcs.the_father,
      ' want him found alive?',
    ],
  ],
  notes: [
    ['Working ideas from brainstorming. Not settled, and the players know none of it.'],
    [
      '',
      refs.npcs.the_father,
      ' may be a past adventurer who learned the secret of ',
      refs.npcs.light_13th_marshal,
      ' and the shadow. He takes the memories that Arcane Dust users lose, so he pushes more drug use to learn more, and in that way rivals Light.',
    ],
    [
      '',
      refs.organizations.the_eyeless_hand,
      ' first dealt in the drug for money. Now the drug empire exists to feed a network of information.',
    ],
    [
      'He is out to control the whole world. ',
      refs.pcs.jim,
      ' was meant to be his protégé and replacement, which would explain why he wants him found alive.',
    ],
    [
      'Settled: ',
      refs.npcs.the_father,
      ' wants ',
      refs.npcs.light_13th_marshal,
      ' to put down the pen. On the day Light stops writing, the memories the Father holds are the only record left in the world, and whoever owns the only memory owns everything. Light does not know this. The party can find it out, and must then convince Light that he cannot carry out his plan yet.',
    ],
    [
      'Still open: how far the Hand reaches into the ',
      refs.organizations.marshals_court,
      ', and who fired the green beam.',
    ],
  ],
  quests: [refs.quests.jims_past],
  plots: [
    {
      name: 'Warnings in Fajanet',
      status: 'closed',
      events: [refs.events.n2_e005, refs.events.n2_e020],
    },
    {
      name: 'The Hand inside the guild',
      status: 'closed',
      npcs: [refs.npcs.hex, refs.npcs.sneeve],
      events: [refs.events.n2_e042, refs.events.n2_e058, refs.events.n2_e059],
    },
    {
      name: 'Roberto’s maps',
      status: 'closed',
      npcs: [refs.npcs.roberto, refs.npcs.the_father],
      events: [refs.events.n2_e073, refs.events.n2_e075, refs.events.n2_e076],
    },
    {
      name: 'The Hand can still find Jim',
      status: 'closed',
      events: [refs.events.n2_e106, refs.events.n2_e122],
    },
    {
      name: 'The Father’s bargain in the dungeon',
      status: 'closed',
      npcs: [refs.npcs.the_father],
      events: [refs.events.n2_e153],
    },
    {
      name: 'The Hand closes in',
      hook: [
        [
          'The Hand knows where ',
          refs.pcs.jim,
          ' sleeps. What do they do now that he looks like a ghost?',
        ],
      ],
      npcs: [refs.npcs.the_father],
      scene: refs.scenes.the_hand_comes_for_jim,
    },
    {
      name: 'Who still remembers Jim',
      hook: [
        [
          'The green beam struck thousands across the sky islands. Who still cares about ',
          refs.pcs.jim,
          ', and what happened to him?',
        ],
      ],
      scene: refs.scenes.the_green_beam_over_the_sky_islands,
    },
  ],
})
