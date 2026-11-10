import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan buys Cassian a replacement bag for the winnings',
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' withdrew his winnings from ',
      refs.items.cassian_s_treasure_chest,
      '. A roll set the toll at ten percent, leaving the equivalent of 90,000 gold from its original contents.',
    ],
    [
      'He sent ',
      refs.pcs.devan,
      ' to buy ',
      refs.items.cassian_s_replacement_bag_of_holding,
      ', then loaded his money into it. The purchase was fully paid; no debt remained. Its cost and the subsequent cash balance were discussed inconsistently, so no exact inventory balance is asserted. ',
      refs.pcs.cassian_veyl,
      ' also handed ',
      refs.pcs.swift_starblade,
      ' his 1,000-gold roulette share.',
    ],
    [
      'The original chest remained at the casino on ',
      refs.locations.nimbus,
      '. The DM ruled that it could not be taken away inside the replacement bag.',
    ],
  ],
  day: 24,
  location: refs.locations.nimbus,
  mark: { type: 'icon', name: 'gi/GiTrade' },
})
