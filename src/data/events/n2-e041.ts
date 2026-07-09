import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Board the boat to Fairhaven',
  date: new Date('2026-08-19T08:00'),
  location: refs.locations.the_boat_to_fairhaven,
  mark: { type: 'icon', name: 'gi/GiSailboat' },
  parts: [
    [
      'After a night in ',
      refs.locations.badesh,
      ', the party boarded a boat bound for ',
      refs.locations.fairhaven,
      '.',
    ],
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.victor_the_badesh_lumberjack,
      ' (travelling with ',
      refs.npcs.abraham,
      ').',
    ],
  ],
})
