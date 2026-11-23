import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Borris welcomes the party to his Nimbus casino',
  notes: [
    [
      'The guards called ',
      refs.npcs.borris,
      ' through a communication crystal. He recognised the party, waived the one-silver entry fee, and welcomed them inside.',
    ],
    [
      'He was bloodied and said he had a meeting to finish. The DM described it as an interrogation. The party received complimentary scotch.',
    ],
  ],
  day: 24,
  location: refs.locations.borris_s_gambling_den,
  mark: { type: 'avatar', of: refs.npcs.borris },
  illustrations: ['/assets/scenes/borris-welcomes-the-party-to-his-nimbus-casino.png'],
})
