import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Pass through a holy site into the mountains',
  date: new Date('2026-08-17T16:00'),
  location: refs.locations.holy_site,
  mark: { type: 'icon', name: 'fa/FaChurch' },
  parts: [
    'The party passed through a holy site and continued upwards into the mountains.',
    'Open: whose holy site? What faith? Not stated.',
    [
      'Party: ',
      refs.pcs.jim,
      ', ',
      refs.pcs.william_greenhove,
      ', ',
      refs.pcs.revin_grumblefist,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.swift_starblade,
    ],
  ],
})
