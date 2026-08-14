import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim’s lightning curse reveals his human identity',
  day: 21,
  location: refs.locations.jim_s_room_at_nimbus_s_second_best_inn,
  mark: { type: 'icon', name: 'gi/GiLightningStorm' },
  notes: [
    [
      'The next morning, the storm following ',
      refs.pcs.jim,
      ' struck him with lightning inside ',
      refs.locations.jim_s_room_at_nimbus_s_second_best_inn,
      ' and started a fire, causing at least some fire damage. The fire was apparently put out and the room is assumed to have remained intact, but the exact damage was not established. ',
      refs.pcs.jim,
      ' was not wearing ',
      refs.items.jim_s_kenku_suit,
      ' during the incident, while the ',
      refs.items.jaded_amulet,
      ' initially prevented the others from recognizing the human leaving ',
      refs.locations.jim_s_room_at_nimbus_s_second_best_inn,
      '.',
    ],
    [
      refs.pcs.devan,
      ', ',
      refs.pcs.cassian_veyl,
      ', and ',
      refs.pcs.swift_starblade,
      ' all learned that ',
      refs.pcs.jim,
      ' is a human who had presented himself in ',
      refs.items.jim_s_kenku_suit,
      ' after sustained attention weakened the ',
      refs.items.jaded_amulet,
      '’s concealment. ',
      refs.items.jim_s_kenku_suit,
      ' was damaged but not destroyed completely: ',
      refs.pcs.devan,
      ' recovered it, attempted to heal it, and then buried it.',
    ],
  ],
})
