import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party sees Fairhaven’s smoking crater',
  day: 15,
  location: refs.locations.snowy_mountains,
  mark: { type: 'icon', name: 'gi/GiBlast' },
  notes: [
    [
      'From the mountain, the party saw that the former site of ',
      refs.locations.fairhaven,
      ' had become a huge, oil-filled, smoking crater. The trail of destruction suggested that the invading monster had continued into the sea.',
    ],
  ],
})
