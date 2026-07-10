import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Pass through a holy site into the mountains',
  day: 9,
  location: refs.locations.holy_site,
  mark: { type: 'icon', name: 'fa/FaChurch' },
  notes: [
    ['The party passed through a holy site and continued upwards into the mountains.'],
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
