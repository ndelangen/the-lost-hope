import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The elevator opens into a slave mine',
  day: 13,
  location: refs.locations.shadowpeak_mining_operation,
  mark: { type: 'icon', name: 'fa/FaMapMarkerAlt' },
  notes: [
    [
      'The party stepped from an elevator into a busy underground mining operation. Workers shoved them aside as they took in the slave pit, collars, and human overseers holding elves, orcs, and half-orcs captive.',
    ],
    [
      'There they encountered ',
      refs.pcs.fix,
      ' delivering a cart of potions to ',
      refs.npcs.lord_malachar,
      ' with ',
      refs.npcs.abraham,
      ' pulling the cart.',
    ],
  ],
})
