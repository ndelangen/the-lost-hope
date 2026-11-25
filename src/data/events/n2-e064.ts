import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift refuses the demon broom for 100 GP',
  day: 13,
  location: refs.locations.giggles_and_gadgets,
  illustrations: ['/assets/scenes/swift-refuses-the-demon-broom-for-100-gp.png'],
  mark: { type: 'avatar', of: refs.pcs.swift_starblade },
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
