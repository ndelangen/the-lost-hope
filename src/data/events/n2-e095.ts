import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Bob's bargains change Wolfie and bind Jim to a contract",
  day: 17,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'icon', name: 'gi/GiTrade' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' made a random magical draw from ',
      refs.npcs.bob_the_merchant,
      ' and received a one-use obedience whip. He used it on ',
      refs.beasts.wolfie,
      ', permanently enabling the pup to understand his handler’s intentions and communicate his own needs while retaining free will.',
    ],
    [
      refs.pcs.jim,
      ' commissioned permanent magic that would let selected people see him under another appearance and fail to recognize him. The price was 250 GP: 30 GP immediately and 220 GP due within seven months.',
    ],
    [
      refs.npcs.bob_the_merchant,
      ' promised delivery after four months. The signed divine contract lets Bob locate ',
      refs.pcs.jim,
      ' and requires them to negotiate another form of payment if the balance is not paid on time.',
    ],
    ['Bob also gave ', refs.pcs.cassian_veyl, ' the ', refs.items.wolfie_tracking_ring, '.'],
  ],
})
