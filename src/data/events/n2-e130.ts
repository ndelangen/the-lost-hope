import { refs } from '#/data/generated/refs.ts'
import { create as createEvent } from '#/definitions/event.ts'

export default createEvent({
  name: 'Devan brings the party to the Gruumsh War Temple',
  day: 21,
  location: refs.locations.gruumsh_temple_main_hall,
  mark: { type: 'icon', name: 'gi/GiChurch' },
  notes: [
    [
      refs.pcs.devan,
      ' brought ',
      refs.pcs.cassian_veyl,
      ', ',
      refs.pcs.jim,
      ', and ',
      refs.pcs.swift_starblade,
      ' to the ',
      refs.locations.gruumsh_war_temple,
      '.',
    ],
    [
      'About twenty-seven worshippers were gathered in the ',
      refs.locations.gruumsh_temple_main_hall,
      ', where the party met the ',
      refs.npcs.gruumsh_high_priest,
      '.',
    ],
  ],
})
