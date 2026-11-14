import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Crowy becomes the Bird of Gluttony',
  day: 21,
  location: refs.locations.skynet_s_second_best_inn,
  mark: { type: 'avatar', of: refs.pcs.jim },
  notes: [
    [
      refs.npcs.crowy,
      ' consumed ',
      refs.pcs.jim,
      '’s Sleep spell, called itself the “Bird of Gluttony,” and said the change also made it much hungrier. The exact effect and limits of consuming the spell remain unknown.',
    ],
  ],
})
