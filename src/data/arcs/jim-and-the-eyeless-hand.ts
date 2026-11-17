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
    [
      'The hidden truth behind this arc lives on ',
      refs.npcs.the_father,
      ': what he wants, how he works, and what he did with the green beam.',
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
          'A green pulse swept the sky islands and took memories. Who still cares about ',
          refs.pcs.jim,
          ', and what happened to him?',
        ],
      ],
      scene: refs.scenes.the_green_beam_over_the_sky_islands,
    },
    {
      name: 'What Jim left behind',
      hook: [
        [
          'His swords and a coded letter are what is left of ',
          refs.pcs.jim,
          '. Who takes them up, and who reads it?',
        ],
      ],
      scene: refs.scenes.the_party_reunites_on_the_docks,
    },
  ],
})
