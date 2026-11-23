import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party carries the sleeping Cassian in the Bag of Holding',
  day: 22,
  location: refs.locations.serpent_eclipse_rest_chamber,
  mark: { type: 'avatar', of: refs.pcs.cassian_veyl },
  notes: [
    [
      refs.pcs.cassian_veyl,
      " could not be woken after the party's ",
      refs.rules.short_rest,
      '. They placed him in the ',
      refs.items.bag_of_holding,
      ' and carried him with them.',
    ],
  ],
  illustrations: [
    '/assets/scenes/the-party-carries-the-sleeping-cassian-in-the-bag-of-holding.png',
  ],
})
