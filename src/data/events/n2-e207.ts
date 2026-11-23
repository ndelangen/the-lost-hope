import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The fortress pulse breaks bonds with Jim',
  day: 24,
  location: refs.locations.three_sky_kingdoms,
  mark: { type: 'icon', name: 'fa/FaUsersSlash' },
  illustrations: ['/assets/scenes/the-fortress-pulse-breaks-bonds-with-jim-novel.png'],
  bondOutcomes: {
    toward: refs.pcs.jim,
    retained: [
      refs.pcs.cassian_veyl,
      refs.pcs.devan,
      refs.npcs.crowy,
      refs.npcs.borris,
      refs.npcs.gruumsh_high_priest,
      refs.npcs.sylvia,
      refs.npcs.penelope,
      refs.npcs.bob_the_gate_troll,
      refs.npcs.light_13th_marshal,
      refs.npcs.the_father,
    ],
    severed: refs.effects.severed_bond_with_jim,
  },
  notes: [
    [
      'A visible pulse spread from the flying fortress across the islands. Everyone felt emotional pain as connections broke. It left people’s memories of ',
      refs.pcs.jim,
      ' intact, but could sever their emotional attachment to him.',
    ],
    [
      refs.pcs.cassian_veyl,
      ' held onto his bond because he valued belonging to the party. ',
      refs.pcs.devan,
      ' held onto his through his promise to ',
      refs.pcs.fix,
      ' to look after ',
      refs.pcs.jim,
      '.',
    ],
    [refs.pcs.jim, ' could feel which connections he had lost.'],
  ],
})
