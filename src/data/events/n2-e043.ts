import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Settle into the Fairhaven guildhall',
  date: new Date('2026-08-20T12:00'),
  location: refs.locations.fairhaven_guildhall,
  mark: { type: 'icon', name: 'fa/FaLandmark' },
  parts: [
    [
      'Inside the city, the party made their way to the ',
      refs.locations.fairhaven_guildhall,
      ' and settled in.',
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
