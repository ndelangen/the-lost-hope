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
          refs.pcs.jim,
          ' escaped the first capture attempt, but vanished in the fortress beam. ',
          refs.pcs.swift_starblade,
          ' has not answered the offer of ',
          refs.npcs.silas_wren,
          '.',
        ],
      ],
      npcs: [refs.npcs.the_father],
      scene: refs.scenes.the_hand_comes_for_jim,
      events: [refs.events.n2_e206, refs.events.n2_e208, refs.events.n2_e218],
      notes: [
        [
          refs.npcs.silas_wren,
          ' tried to bring ',
          refs.pcs.jim,
          ' home and offered ',
          refs.pcs.swift_starblade,
          ' membership. ',
          refs.pcs.auren,
          ' says stolen Hand records let him follow the party. The tracking mechanism is still unknown.',
        ],
      ],
    },
    {
      name: 'Who still remembers Jim',
      hook: [['Who still cares about ', refs.pcs.jim, ', and can the severed bonds be restored?']],
      scene: refs.scenes.the_green_pulse_over_the_sky_islands,
      events: [refs.events.n2_e207],
      notes: [
        [
          'Memories survived the pulse. ',
          refs.pcs.cassian_veyl,
          ', ',
          refs.pcs.devan,
          ', ',
          refs.npcs.crowy,
          ', and ',
          refs.npcs.the_father,
          ' retained their emotional bonds; ',
          refs.pcs.swift_starblade,
          ' and ',
          refs.pcs.fix,
          ' did not. The full confirmed save-tracker outcomes are recorded in ',
          refs.events.n2_e207,
          '.',
        ],
      ],
    },
    {
      name: 'Taken',
      hook: [
        [
          'Two beams from the flying fortress, and ',
          refs.pcs.jim,
          ' is gone. What does ',
          refs.pcs.swift_starblade,
          ' do with what is left on the docks?',
        ],
      ],
      npcs: [refs.npcs.the_father],
      scene: refs.scenes.the_green_beam_over_the_sky_islands,
      events: [refs.events.n2_e209, refs.events.n2_e210],
      notes: [
        [
          'The first beam scattered over ',
          refs.locations.nimbus,
          '; the second made ',
          refs.pcs.jim,
          ' disappear. His fate was not established in play.',
        ],
      ],
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
      events: [refs.events.n2_e211, refs.events.n2_e216, refs.events.n2_e217],
      notes: [
        [
          refs.pcs.swift_starblade,
          ' holds the recovered weapons, pages, and book. ',
          refs.pcs.auren,
          ' survived accepting the Zodiac dagger. The decoded letter warns about ',
          refs.npcs.light_13th_marshal,
          ', without proving what he is hiding.',
        ],
      ],
    },
    {
      name: 'A box from home',
      hook: [
        [
          refs.pcs.fix,
          ' brings the party a box from ',
          refs.organizations.the_eyeless_hand,
          ' and a warning: stop caring about ',
          refs.pcs.jim,
          ', or be hunted for it. Will they?',
        ],
      ],
      npcs: [refs.npcs.the_father],
      scene: refs.scenes.fix_s_last_delivery,
    },
  ],
})
