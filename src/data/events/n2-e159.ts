import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift resummons Captain Squawk after the dungeon',
  day: 23,
  location: refs.locations.skynet_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'After resting, ',
      refs.pcs.swift_starblade,
      ' spent an hour resummoning ',
      refs.beasts.captain_squawk,
      '. The familiar appeared smaller and frightened after its death, snuggled against him, and fell asleep.',
    ],
  ],
})
