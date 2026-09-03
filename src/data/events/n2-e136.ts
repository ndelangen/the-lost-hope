import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift summons a rainbow parrot',
  day: 22,
  location: refs.locations.nimbus_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' performed the Find Familiar ritual in his room. Black smoke and thunder filled the room before ',
      refs.beasts.captain_squawk,
      ' appeared, greeted him with "Oi, captain," and perched on his shoulder for the trip downstairs.',
    ],
  ],
})
