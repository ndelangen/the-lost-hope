import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Swift buys bright-red studded leather from Bessy',
  day: 18,
  location: refs.locations.sylvias_flying_bazaar,
  mark: { type: 'avatar', url: '/assets/pcs/swift.jpg' },
  notes: [
    [
      'The party found ',
      refs.npcs.bessy,
      ' working in the ship’s crafting area. ',
      refs.pcs.swift_starblade,
      ' negotiated a set of shiny light-red studded leather armour for 50 GP and sold an unused shortsword and shortbow.',
    ],
    [
      refs.npcs.bessy,
      ' also advised Swift that a balanced metal blade would be the right basis for a future modification to ',
      refs.items.demon_possessed_flying_broom,
      '.',
    ],
  ],
})
