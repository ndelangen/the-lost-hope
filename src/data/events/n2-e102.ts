import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party is arrested for reckless donkey driving',
  day: 10,
  location: refs.locations.badesh,
  mark: { type: 'avatar', url: '/assets/pcs/placeholder.svg' },
  notes: [
    [
      'After reaching ',
      refs.locations.badesh,
      ', the party was arrested for reckless donkey driving. The surviving recap does not preserve the exact conduct or outcome.',
    ],
    [
      refs.npcs.ryan,
      ', the town’s guard captain, was charmed with the Friends spell. The recap does not identify who cast it or exactly when during the arrest it happened.',
    ],
  ],
})
