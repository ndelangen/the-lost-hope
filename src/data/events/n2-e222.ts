import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party clears Ride the Lightning’s boarding rooms',
  day: 24,
  location: refs.locations.ride_the_lightning_main_deck,
  mark: { type: 'icon', name: 'gi/GiProgression' },
  notes: [
    [
      refs.pcs.swift_starblade,
      ', ',
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.auren,
      ', and ',
      refs.pcs.devan,
      ' fought through the two bow compartments of ',
      refs.items.ride_the_lightning,
      '. ',
      refs.pcs.devan,
      ' advanced into the adjoining fight and ',
      refs.pcs.cassian_veyl,
      ' supported him from behind at the doorway. ',
      refs.pcs.auren,
      ' fought in the other entry room while ',
      refs.pcs.swift_starblade,
      ' moved out of the defenders’ grasp and used cover.',
    ],
    [
      'The defenders, six in one room and seven in the other, were described as mentally altered and not fully themselves. None of the thirteen survived. The initial rooms were cleared, but the party had not reached the bridge, taken control of the vessel, or explored the remaining rooms when the session ended.',
    ],
  ],
})
