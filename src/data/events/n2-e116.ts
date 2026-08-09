import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Sir Fabulous becomes Devan’s divine steed',
  day: 20,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
  notes: [
    [
      refs.pcs.devan,
      ' chose ',
      refs.beasts.sir_fabulous,
      ' as the form of his magically bonded steed. A divine blessing enlarged and altered the dire wolf, transforming him into ',
      refs.beasts.sir_fabulous_divine_steed,
      '.',
    ],
  ],
})
