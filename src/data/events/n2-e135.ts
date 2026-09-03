import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim wakes to another lightning strike',
  day: 22,
  location: refs.locations.nimbus_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      'After a night at the inn, ',
      refs.pcs.jim,
      ' suffered another morning lightning strike, taking nine damage. The party prepared to return to the dungeon after breakfast.',
    ],
  ],
})
