import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The survivors sail for Verdant Haven',
  day: 14,
  location: refs.locations.fairhaven_evacuation_ship,
  illustrations: ['/assets/scenes/the-survivors-sail-for-verdant-haven.png'],
  mark: { type: 'avatar', of: refs.pcs.theron },
  notes: [
    [
      'After drifting while the survivors debated where to go, the party chose ',
      refs.locations.verdant_haven,
      ' as their destination across the ',
      refs.locations.sea_of_unknown,
      '.',
    ],
    [
      refs.pcs.theron,
      ' had originally come from ',
      refs.locations.verdant_haven,
      ' across that same sea.',
    ],
  ],
})
