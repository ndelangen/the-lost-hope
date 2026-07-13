import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift tames a demon-possessed flying broom',
  day: 13,
  location: refs.locations.giggles_and_gadgets,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      refs.npcs.mr_bumblefoot,
      ' made and sold mechanisms at ',
      refs.locations.giggles_and_gadgets,
      ', including flying brooms. ',
      refs.items.demon_possessed_flying_broom,
      ' had stopped obeying him because it was possessed by a demon.',
    ],
    [
      refs.pcs.swift_starblade,
      ' decided he could tame ',
      refs.items.demon_possessed_flying_broom,
      '. He mounted it, succeeded, and became its master.',
    ],
    [
      refs.pcs.swift_starblade,
      ' had not paid for ',
      refs.items.demon_possessed_flying_broom,
      ', however, so he put it back in the shop.',
    ],
  ],
})
