import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Skynet Coin Dealer',
  illustration: '/assets/locations/skynet-coin-dealer-illustration.png',
  icon: 'gi/GiTwoCoins',
  type: 'building',
  parent: refs.locations.skynet,
  at: [934, 226],
})
