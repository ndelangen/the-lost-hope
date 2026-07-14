import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan buys an enslaved child’s freedom',
  day: 17,
  location: refs.locations.shadowpeak_mining_operation,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
  notes: [
    [
      refs.pcs.devan,
      ' insisted on returning to the mine to free the captives. He sold a rare dragon scale to buy the freedom of one enslaved child and directed the child to ',
      refs.npcs.borris,
      '.',
    ],
  ],
})
