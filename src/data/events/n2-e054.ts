import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: "Abraham's cart leads the escape",
  day: 17,
  location: refs.locations.shadowpeak,
  mark: { type: 'avatar', url: '/assets/pcs/jim-kenku.jpg' },
  notes: [
    [
      refs.pcs.jim,
      ' directed the party to load as many people as possible onto the cart pulled by ',
      refs.npcs.abraham,
      ' and ordered the stampede out of town amid the chaos.',
    ],
    [
      'Abraham rescued the party for the second recorded time, but the rushed escape caused multiple innocent casualties. The consequences will weigh on Jim; whether they affected Abraham is unclear.',
    ],
  ],
})
