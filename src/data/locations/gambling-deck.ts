import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gambling Deck',
  icon: 'gi/GiPokerHand',
  type: 'district',
  parent: refs.locations.the_flying_whale,
  at: [725, 350],
  notes: [
    [
      'The casino area aboard ',
      refs.locations.the_flying_whale,
      ', containing numerous gaming tables and the table run by ',
      refs.npcs.the_fiddler,
      '.',
    ],
  ],
})
