import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan reports a southern direction beyond Nimbus',
  notes: [
    [
      refs.pcs.devan,
      ' attempted to locate something the transcript calls Carl. The DM ruled that it was not on ',
      refs.locations.nimbus,
      ' and gave a direction to the south. The target and means of locating it are unclear, so this is not identified as ',
      refs.npcs.grimgor_the_bloody,
      "'s tomb or bones.",
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
})
