import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The first draws bring flight, hunger, whispers, and a cloak',
  notes: [
    [
      'The first draw gave ',
      refs.npcs.sarogarth,
      ' ',
      refs.effects.flight,
      '. ',
      refs.pcs.jim,
      ' drew ',
      refs.effects.whispers,
      '.',
    ],
    [refs.pcs.cassian_veyl, ' drew ', refs.effects.hunger, '.'],
    [
      refs.pcs.swift_starblade,
      ' initially drew an alignment change to lawful good. He spent two DM tokens and received a curse token to replace that draw with Sun. The DM substituted a magic item for the experience award because the campaign uses milestones. The ',
      refs.items.mimic_cloak,
      ' appeared on the table and ',
      refs.pcs.swift_starblade,
      ' accepted it. The alignment change did not remain in force.',
    ],
  ],
  day: 24,
  location: refs.locations.borris_s_gambling_den,
  mark: { type: 'icon', name: 'gi/GiCardRandom' },
})
