import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party breaks into Mortimer’s shop',
  day: 13,
  location: refs.locations.mortimer_s_shop,
  mark: { type: 'icon', name: 'gi/GiLockpicks' },
  notes: [
    [
      'The party returned to ',
      refs.locations.mortimer_s_shop,
      ' to confront ',
      refs.npcs.mortimer_mafioso,
      ', but ',
      refs.npcs.mortimer_mafioso,
      ' was absent. Several party members broke into the shop, triggered a magical alarm, and managed to silence or disarm it.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
      ', ',
      refs.pcs.victor_dranzig,
      '.',
    ],
  ],
})
