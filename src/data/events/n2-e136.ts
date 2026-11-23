import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift summons a rainbow parrot',
  day: 22,
  location: refs.locations.swift_s_room_at_skynet_s_second_best_inn,
  mark: { type: 'avatar', of: refs.pcs.swift_starblade },
  notes: [
    [
      refs.pcs.swift_starblade,
      ' performed the Find Familiar ritual in his room. Black smoke and thunder filled the room before ',
      refs.beasts.captain_squawk,
      ' appeared, greeted him with "Oi, captain," and perched on his shoulder for the trip downstairs.',
    ],
  ],
  illustrations: ['/assets/scenes/swift-summons-a-rainbow-parrot.png'],
})
