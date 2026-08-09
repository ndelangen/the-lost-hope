import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: "Sylvia's Flying Bazaar",
  icon: 'gi/GiCargoShip',
  type: 'route',
  parent: refs.locations.world,
  at: [0, 0],
  notes: [
    [
      'A flying warship captained by ',
      refs.npcs.sylvia,
      ', roughly 120 metres long and 90 metres wide. Its upper deck is a bazaar containing ',
      refs.locations.bob_s_stall,
      ', its middle deck holds bars and ',
      refs.locations.gambling_deck,
      ', and its lower deck contains sleeping quarters and ',
      refs.locations.lower_stables,
      '.',
    ],
    ['The vessel’s proper name has not yet been established.'],
  ],
})
