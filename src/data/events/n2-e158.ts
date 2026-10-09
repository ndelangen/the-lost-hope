import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party gives Sarogarth a room at the inn',
  day: 22,
  location: refs.locations.skynet_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      refs.npcs.sarogarth,
      ' discovered that his ancient silver currency was no longer accepted. The party paid for his food and room, and discussed selling old coins to an antique dealer. He prepared a drink inspired by ',
      refs.npcs.grimgor_the_bloody,
      '.',
    ],
    [
      refs.pcs.jim,
      ' resisted an unexplained compulsion to drink it and asked for beer instead. The party then took a long rest.',
    ],
  ],
})
