import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift disrupts the Festival of the Heroes announcement',
  day: 13,
  location: refs.locations.fairhaven_town_square,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'At ',
      refs.locations.fairhaven_town_square,
      ', the ',
      refs.npcs.mayor_of_fairhaven,
      ' was due to make a major announcement about the Festival of the Heroes.',
    ],
    [
      refs.pcs.swift_starblade,
      ' repeatedly tried to have himself added to the list of heroes. He failed, and the ',
      refs.npcs.mayor_of_fairhaven,
      ' became upset with him for interfering multiple times.',
    ],
  ],
})
