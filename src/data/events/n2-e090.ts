import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party spots an unidentified floating island',
  day: 16,
  location: refs.locations.snowy_mountain_ruin,
  mark: { type: 'icon', name: 'gi/GiFloatingPlatforms' },
  notes: [
    [
      'After sleeping another night, the party reached the mountain peak the following morning and saw an ',
      refs.locations.unidentified_floating_island,
      ' that none of them could identify.',
    ],
  ],
})
