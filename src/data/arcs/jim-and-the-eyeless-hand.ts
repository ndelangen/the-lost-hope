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
    },
  ],
})
