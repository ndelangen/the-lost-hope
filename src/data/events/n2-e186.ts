import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Borris welcomes the party to his Nimbus casino',
  notes: [
    [
      'The guards called ',
      refs.npcs.borris,
      ' through a communication crystal. He recognised the party, waived the one-silver entry fee, and welcomed them into his casino. Its public gaming floor led to a separate VIP room with gaming tables, snail races with little carts, and tables offering drugs.',
    ],
    [
      'He was bloodied and said he had a meeting to finish. The DM described it as an interrogation. The party received complimentary scotch.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
})
