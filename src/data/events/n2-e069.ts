import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party evacuates civilians aboard the third ship',
  day: 14,
  location: refs.locations.fairhaven_evacuation_ship,
  mark: { type: 'icon', name: 'gi/GiLifeBuoy' },
  notes: [
    [
      refs.pcs.jim,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
      ', ',
      refs.pcs.victor_dranzig,
      ', and ',
      refs.pcs.theron,
      ' reconvened at ',
      refs.locations.fairhaven_harbor,
      '.',
    ],
    [
      'Two ships were already departing: one carried the military and another carried the royalty. The ',
      refs.locations.fairhaven_evacuation_ship,
      ' remained in the harbor.',
    ],
    [
      'The party and the crime boss ',
      refs.npcs.borris,
      ' helped civilians board the ',
      refs.locations.fairhaven_evacuation_ship,
      ' safely and then embarked themselves. The ',
      refs.locations.fairhaven_evacuation_ship,
      ' carried 168 survivors, excluding the party.',
    ],
  ],
})
