import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Green-cloaked shadows lead to a gambling den',
  day: 12,
  location: refs.locations.fairhaven,
  mark: { type: 'icon', name: 'fa/FaBeer' },
  notes: [
    [
      'Green-cloaked figures watched from the rooftops while the party investigated the alchemists. Following one after drinking accidentally led the party into a gambling and drugs den.',
    ],
    [
      refs.pcs.devan,
      ' drank with the crime boss ',
      refs.npcs.borris,
      '. The party arranged to meet the green-cloaked figure the following morning.',
    ],
  ],
})
