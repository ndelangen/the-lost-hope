import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Sarogarth opens a portal back to Skynet',
  day: 24,
  location: refs.locations.skynet,
  mark: { type: 'icon', name: 'gi/GiDoorway' },
  notes: [
    [
      refs.npcs.sarogarth,
      ' rejoined the party after being fetched from the inn. He turned ',
      refs.npcs.dax,
      ' and ',
      refs.npcs.sylf,
      ' into bracelets and opened a portal from the estate to a square near the market.',
    ],
    [
      'The conversation included conflicting statements about his age and time in the crystal. The party also discussed whether travelling into the past was possible; this did not establish a successful journey by any of them.',
    ],
  ],
})
