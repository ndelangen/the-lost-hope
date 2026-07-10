import { refs } from '#/data/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim speaks with Light 1:1',
  day: 2,
  location: refs.locations.fajanet_guildhall,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      'Rather than obey the letter, ',
      refs.pcs.jim,
      ' spoke with ',
      refs.npcs.third_marshal_light,
      ' 1:1.',
    ],
    ['Light was understanding and told Jim to meet him with the rest of the party in the morning.'],
    [
      'This is the first time Jim has met Light one-on-one, separate from the rest of the party. The content of their conversation is not recorded.',
    ],
  ],
})
