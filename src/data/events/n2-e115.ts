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
      ' for 5,000 GP. ',
      refs.npcs.bob_the_merchant,
      ' said its additional random effect would be determined later.',
    ],
    [
      refs.pcs.jim,
      ' paid his outstanding balance to ',
      refs.npcs.bob_the_merchant,
      ' in full while the party was at ',
      refs.locations.bob_s_stall,
      '.',
    ],
  ],
})
