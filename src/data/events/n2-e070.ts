import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The survivors sail for Verdant Haven',
  day: 14,
  location: refs.locations.fairhaven_evacuation_ship,
  mark: {
    type: 'avatar',
    url: 'https://www.dndbeyond.com/avatars/52821/990/1581111423-155753427.jpeg',
  },
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
