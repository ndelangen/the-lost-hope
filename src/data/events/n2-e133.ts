import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party feasts in the Gruumsh Temple Blood Hall',
  day: 21,
  location: refs.locations.gruumsh_temple_blood_hall,
  mark: { type: 'icon', name: 'gi/GiDrinking' },
  notes: [
    [
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.jim,
      ', and ',
      refs.pcs.swift_starblade,
      ' joined the communal feast in the meticulously clean ',
      refs.locations.gruumsh_temple_blood_hall,
      '.',
    ],
    [
      'Despite having eaten heavily earlier, Cassian remained intensely hungry, preferred raw meat, and could identify different animals by scent.',
    ],
  ],
})
