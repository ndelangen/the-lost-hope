import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Silas offers Swift a place in the Eyeless Hand',
  day: 24,
  location: refs.locations.nimbus_harbour,
  mark: { type: 'avatar', of: refs.pcs.swift_starblade },
  notes: [
    [
      refs.npcs.silas_wren,
      ' turned invisible and offered ',
      refs.pcs.swift_starblade,
      ' a place in ',
      refs.organizations.the_eyeless_hand,
      '. He promised opportunities to recover the ',
      refs.items.demon_possessed_flying_broom,
      ' and obtain a grand ship with a truly loyal crew.',
    ],
    [
      refs.npcs.silas_wren,
      ' gave him time to consider. ',
      refs.pcs.swift_starblade,
      ' did not accept or reject the offer.',
    ],
  ],
  illustrations: ['/assets/scenes/silas-offers-swift-a-place-in-the-eyeless-hand.png'],
})
