import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan reports a southern direction beyond Nimbus',
  notes: [
    [
      refs.pcs.devan,
      ' tried to locate something. The DM ruled that it was not on ',
      refs.locations.nimbus,
      ' and gave a direction to the south.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'avatar', of: refs.pcs.devan },
})
