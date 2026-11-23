import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party helps Sarogarth sell an ancient coin',
  day: 24,
  location: refs.locations.skynet_coin_dealer,
  mark: { type: 'avatar', of: refs.pcs.devan },
  notes: [
    [
      refs.pcs.devan,
      ' handled the negotiation to sell an old coin belonging to ',
      refs.npcs.sarogarth,
      ' at a mint or coin dealer. He presented it as a family heirloom, and the dealer called an older relative to examine it.',
    ],
    [
      'After bargaining, the coin sold for about 250 gold. A five-gold commission was discussed. They talked about selling the remaining coins at different places to avoid flooding the market.',
    ],
  ],
  illustrations: ['/assets/scenes/the-party-helps-sarogarth-sell-an-ancient-coin.png'],
})
