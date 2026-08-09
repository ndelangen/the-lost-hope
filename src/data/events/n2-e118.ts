import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party takes rooms sixty feet apart',
  day: 20,
  location: refs.locations.nimbus_s_second_best_inn,
  mark: { type: 'icon', name: 'gi/GiTavernSign' },
  notes: [
    [
      'The party booked four separate rooms at ',
      refs.locations.nimbus_s_second_best_inn,
      '. They asked the staff to place the rooms at least sixty feet apart so that the storm following ',
      refs.pcs.jim,
      ' would not strike anyone else.',
    ],
  ],
})
