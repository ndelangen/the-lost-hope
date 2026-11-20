import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The fortress pulse breaks bonds with Jim',
  day: 24,
  location: refs.locations.nimbus_harbour,
  mark: { type: 'icon', name: 'fa/FaUsersSlash' },
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
      '. ',
      refs.pcs.swift_starblade,
      ' failed to retain his attachment and acquired ',
      refs.effects.severed_bond_with_jim,
      '.',
    ],
    [
      refs.pcs.jim,
      ' could feel which connections he had lost. ',
      refs.npcs.crowy,
      ' and ',
      refs.npcs.the_father,
      ' still cared about him; the table also established that ',
      refs.pcs.fix,
      ' acquired ',
      refs.effects.fix_s_severed_bond_with_jim,
      '. The remaining individual save results were not reliably recorded.',
    ],
  ],
})
