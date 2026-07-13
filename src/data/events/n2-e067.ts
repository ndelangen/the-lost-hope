import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift frees and steals the demon broom',
  day: 14,
  location: refs.locations.giggles_and_gadgets,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'During the destruction of ',
      refs.locations.fairhaven,
      ', ',
      refs.pcs.swift_starblade,
      ' made for ',
      refs.locations.giggles_and_gadgets,
      ', freed ',
      refs.items.demon_possessed_flying_broom,
      ', and took it without paying.',
    ],
  ],
})
