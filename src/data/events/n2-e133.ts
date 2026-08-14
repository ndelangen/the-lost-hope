import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'The party feasts in the Gruumsh Temple Blood Hall',
  day: 21,
  location: refs.locations.gruumsh_temple_blood_hall,
  mark: { type: 'icon', name: 'gi/GiDrinking' },
  notes: [
    [
      refs.npcs.gruumsh_high_priest,
      ' magically cleaned ',
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.devan,
      ', ',
      refs.pcs.jim,
      ', and ',
      refs.pcs.swift_starblade,
      ' before they entered the ',
      refs.locations.gruumsh_temple_blood_hall,
      ', where the feast in progress left the room covered in blood and entrails.',
    ],
    [
      refs.items.wolfie_tracking_ring,
      ' left ',
      refs.pcs.cassian_veyl,
      ' intensely hungry despite having eaten heavily earlier. He preferred raw meat and could identify different animals by the scent of their blood.',
    ],
  ],
})
