import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift refuses the demon broom for 100 GP',
  day: 13,
  location: refs.locations.giggles_and_gadgets,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'After taming ',
      refs.items.demon_possessed_flying_broom,
      ' in ',
      refs.events.n2_e046,
      ', ',
      refs.pcs.swift_starblade,
      ' had the opportunity to buy it for 100 GP.',
    ],
    [refs.pcs.swift_starblade, ' refused, even though the price was considered a steal.'],
  ],
})
