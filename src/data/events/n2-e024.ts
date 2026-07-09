import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Friendly goblin grass-keepers try to kidnap Mr. Peace',
  date: new Date('2026-08-11T22:00'),
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'fa/FaMapMarkerAlt' },
  parts: [
    [
      refs.pcs.mr_peace,
      "'s flower magic ruined the beautiful turf kept in absolute perfect condition by the ",
      refs.npcs.goblin_grass_keepers,
      ' who maintained the grass.',
    ],
    'The goblins hated him for it.',
    'At night, the goblins tried to kidnap Mr. Peace. The party stopped it from happening.',
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.revin_grumblefist,
      ', ',
      refs.pcs.mr_peace,
    ],
  ],
})
