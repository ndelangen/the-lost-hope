import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian buys the Bag of Holding from Bob',
  day: 20,
  location: refs.locations.bob_s_stall,
  mark: { type: 'icon', name: 'gi/GiTrade' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' bought the ',
      refs.items.bag_of_holding,
      ' from ',
      refs.npcs.bob_the_merchant,
      ' for 5,000 GP. Bob said its additional random effect would be determined later.',
    ],
    [
      refs.pcs.jim,
      ' paid his outstanding balance to Bob in full while the party was at the stall.',
    ],
  ],
})
