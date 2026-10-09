import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The green rod protects Jim from the morning lightning',
  day: 23,
  location: refs.locations.jim_s_room_at_skynet_s_second_best_inn,
  mark: { type: 'avatar', url: '/assets/pcs/jim.jpg' },
  notes: [
    [
      'The morning lightning struck ',
      refs.pcs.jim,
      ' again, but this time it did not hurt him while he had the ',
      refs.items.obsidian_green_rod,
      " in bed. His bed still caught fire. The observation suggested protection from lightning without establishing the rod's full powers.",
    ],
  ],
})
