import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan buys an enslaved child’s freedom',
  day: 17,
  location: refs.locations.shadowpeak_mining_operation,
  mark: { type: 'avatar', of: refs.pcs.devan },
  notes: [
    [
      refs.pcs.devan,
      ' insisted on returning to the mine to free the captives. He sold one of his ',
      refs.items.rare_dragon_scales,
      ' to buy the freedom of one enslaved child and directed the child to ',
      refs.npcs.borris,
      '.',
    ],
  ],
  illustrations: ['/assets/scenes/devan-buys-an-enslaved-child-s-freedom.png'],
})
