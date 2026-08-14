import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Green-cloaked shadows lead to a gambling den',
  day: 13,
  location: refs.locations.fairhaven_gambling_den,
  mark: { type: 'icon', name: 'gi/GiCardRandom' },
  notes: [
    [
      'Green-cloaked figures watched from the rooftops while the party investigated the alchemists. Following one after drinking accidentally led the party into the ',
      refs.locations.fairhaven_gambling_den,
      '.',
    ],
  ],
})
