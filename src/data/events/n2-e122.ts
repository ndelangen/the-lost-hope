import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The Eyeless Hand reveals it can still find Jim',
  day: 20,
  location: refs.locations.nimbus_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/jim-kenku.jpg' },
  notes: [
    [
      'That evening, shortly before going to sleep and suffering his first lightning strike the next morning, ',
      refs.pcs.jim,
      ' read the letters on ',
      refs.items.robertos_map_pages,
      '.',
    ],
    [
      'A message from ',
      refs.organizations.the_eyeless_hand,
      ' showed that the organization was again aware of where Jim was. It indicated that the Hand was backing off somewhat, but the reason and exact meaning were not established.',
    ],
    [
      'It remains unknown whether the pages disclosed Jim’s location or whether the organization found him by another method.',
    ],
  ],
})
