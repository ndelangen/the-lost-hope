import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The broom ritual calls for the heart of an innocent',
  day: 24,
  location: refs.locations.skynet_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'The party read the instructions ',
      refs.npcs.sarogarth,
      ' had supplied for recovering ',
      refs.pcs.swift_starblade,
      "'s ",
      refs.items.demon_possessed_flying_broom,
      '. Letters appeared in a demonic language, with a diagram of a magic circle for a crossroads.',
    ],
    [
      'The instructions called for the heart of an innocent in the candlelit centre of the circle. The exact handling of the heart is unclear in the transcript. The party did not perform the ritual.',
    ],
  ],
})
