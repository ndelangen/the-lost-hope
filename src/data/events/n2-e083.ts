import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan drinks with Borris and receives the endless flask',
  day: 13,
  location: refs.locations.fairhaven,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
  notes: [
    [
      refs.pcs.devan,
      ' drank with the crime boss ',
      refs.npcs.borris,
      ', who gave him ',
      refs.items.flask_of_never_ending_booze,
      ' after their pleasant drink and conversation.',
    ],
    ['Afterward, the party arranged to meet the green-cloaked figure the following morning.'],
  ],
})
