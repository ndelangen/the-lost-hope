import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party carries the sleeping Cassian in the Bag of Holding',
  day: 22,
  location: refs.locations.serpent_eclipse_rest_chamber,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      " could not be woken after the party's short rest. They placed him in the ",
      refs.items.bag_of_holding,
      ' and carried him with them.',
    ],
  ],
})
