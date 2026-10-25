import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Cassian returns from the Bag of Holding',
  day: 24,
  location: refs.locations.jim_s_room_at_skynet_s_second_best_inn,
  mark: { type: 'icon', name: 'gi/GiLifeBuoy' },
  notes: [
    [
      refs.pcs.jim,
      ' pulled ',
      refs.pcs.cassian_veyl,
      ' from the ',
      refs.items.bag_of_holding,
      ' as another morning lightning strike hit ',
      refs.pcs.jim,
      '. The strike dealt four lightning damage and left him convulsing for roughly four minutes.',
    ],
    [
      'At breakfast, the party caught ',
      refs.pcs.cassian_veyl,
      ' up on the dungeon and temple events he had missed. He remembered the serpent encounter and the rest afterward, followed by darkness inside the bag.',
    ],
  ],
})
