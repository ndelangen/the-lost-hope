import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Bob gives the party special daggers',
  day: 4,
  location: refs.locations.fajanet,
  mark: { type: 'icon', name: 'gi/GiDaggers' },
  notes: [
    [
      'On the first day of the five-day festival in ',
      refs.locations.fajanet,
      ', the party met ',
      refs.npcs.bob_the_merchant,
      '.',
    ],
    [
      'Bob gave every party member a different special magical dagger. ',
      refs.pcs.jim,
      ' received the ',
      refs.items.dagger_of_passive_aggression,
      '.',
    ],
  ],
})
