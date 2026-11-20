import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The fortress pulse breaks bonds with Jim',
  day: 24,
  location: refs.locations.three_sky_kingdoms,
  mark: { type: 'icon', name: 'fa/FaUsersSlash' },
  illustrations: ['/assets/scenes/the-green-pulse-over-the-sky-islands.png'],
  bondOutcomes: {
    toward: refs.pcs.jim,
    outcomes: [
      { who: refs.pcs.cassian_veyl, state: 'retained' },
      { who: refs.pcs.devan, state: 'retained' },
      { who: refs.npcs.crowy, state: 'retained' },
      { who: refs.npcs.borris, state: 'retained' },
      { who: refs.npcs.gruumsh_high_priest, state: 'retained' },
      { who: refs.npcs.sylvia, state: 'retained' },
      { who: refs.npcs.penelope, state: 'retained' },
      { who: refs.npcs.bob_the_gate_troll, state: 'retained' },
      { who: refs.npcs.light_13th_marshal, state: 'retained' },
      { who: refs.npcs.the_father, state: 'retained' },
      {
        who: refs.pcs.swift_starblade,
        state: 'severed',
        effect: refs.effects.severed_bond_with_jim,
      },
      { who: refs.pcs.fix, state: 'severed', effect: refs.effects.fix_s_severed_bond_with_jim },
      {
        who: refs.npcs.abraham,
        state: 'severed',
        effect: refs.effects.abraham_s_severed_bond_with_jim,
      },
      {
        who: refs.beasts.wolfie,
        state: 'severed',
        effect: refs.effects.wolfie_s_severed_bond_with_jim,
      },
      {
        who: refs.npcs.sarogarth,
        state: 'severed',
        effect: refs.effects.sarogarth_s_severed_bond_with_jim,
      },
      {
        who: refs.npcs.the_fiddler,
        state: 'severed',
        effect: refs.effects.the_fiddler_s_severed_bond_with_jim,
      },
      {
        who: refs.beasts.phoenix_chick,
        state: 'severed',
        effect: refs.effects.phoenix_chick_s_severed_bond_with_jim,
      },
      {
        who: refs.npcs.bob_the_merchant,
        state: 'severed',
        effect: refs.effects.bob_the_merchant_s_severed_bond_with_jim,
      },
      {
        who: refs.npcs.bessy,
        state: 'severed',
        effect: refs.effects.bessy_s_severed_bond_with_jim,
      },
    ],
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
