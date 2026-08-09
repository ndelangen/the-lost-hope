import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Jim’s lightning curse reveals his human identity',
  day: 21,
  location: refs.locations.nimbus_s_second_best_inn,
  mark: { type: 'icon', name: 'gi/GiLightningStorm' },
  notes: [
    [
      'The next morning, the storm following ',
      refs.pcs.jim,
      ' struck him with lightning inside his room and started a fire. He was not wearing his kenku suit during the incident, while the ',
      refs.items.jaded_amulet,
      ' initially prevented the others from recognizing the human leaving Jim’s room.',
    ],
    [
      refs.pcs.devan,
      ', ',
      refs.pcs.cassian_veyl,
      ', and ',
      refs.pcs.swift_starblade,
      ' all learned that Jim is a human who had presented himself in a kenku suit after sustained attention weakened the amulet’s concealment. The suit was damaged during the incident; Devan attempted to heal it, and it was then buried.',
    ],
  ],
})
