import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Bob’s Stall',
  icon: 'gi/GiShop',
  type: 'building',
  parent: refs.locations.sylvias_flying_bazaar,
  at: [275, 150],
  notes: [
    [
      'A market stall operated by ',
      refs.npcs.bob_the_merchant,
      ', who presents his enormous stock from inside ',
      refs.beasts.mimic_chest,
      '.',
    ],
  ],
})
