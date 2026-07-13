import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Board the boat to Fairhaven',
  day: 11,
  location: refs.locations.the_boat_to_fairhaven,
  mark: { type: 'icon', name: 'gi/GiShipWheel' },
  notes: [
    [
      'After a night in ',
      refs.locations.badesh,
      ', the party boarded a boat bound for ',
      refs.locations.fairhaven,
      '.',
    ],
    ['The voyage took a full day, and the party arrived the following morning.'],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_dranzig,
      ' (travelling with ',
      refs.npcs.abraham,
      ').',
    ],
  ],
})
