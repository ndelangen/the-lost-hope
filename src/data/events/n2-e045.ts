import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Green-cloaked shadows lead to a gambling den',
  day: 13,
  location: refs.locations.fairhaven,
  mark: { type: 'icon', name: 'gi/GiCardRandom' },
  notes: [
    [
      'Green-cloaked figures watched from the rooftops while the party investigated the alchemists. Following one after drinking accidentally led the party into a gambling and drugs den.',
    ],
    [
      refs.pcs.devan,
      ' drank with the crime boss ',
      refs.npcs.borris,
      ', who gave him ',
      refs.items.flask_of_never_ending_booze,
      ' after their pleasant drink and conversation. The party arranged to meet the green-cloaked figure the following morning.',
    ],
  ],
})
