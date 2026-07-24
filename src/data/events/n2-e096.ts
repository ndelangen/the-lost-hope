import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Steve awakens as a magical mace of returning',
  day: 19,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'avatar', url: '/assets/pcs/devan.jpg' },
  notes: [
    [
      refs.pcs.devan,
      ' awoke to find ',
      refs.items.steve_mace_of_returning,
      ' completed: a magical mace with a polished obsidian head, an ancient-bark haft, and an enchantment that returns it to its wielder after a thrown attack.',
    ],
  ],
})
