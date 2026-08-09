import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian reclaims his possessions from the Fiddler’s table',
  day: 20,
  location: refs.locations.gambling_deck,
  mark: { type: 'avatar', url: '/assets/pcs/cassian.jpg' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ' recovered the equipment and gold that his final card had left behind at ',
      refs.npcs.the_fiddler,
      '’s table.',
    ],
  ],
})
