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
      ' and identified himself as a long-standing member of the ',
      refs.organizations.church_of_gruumsh,
      '.',
    ],
    [
      'About twenty-seven worshippers were gathered in the ',
      refs.locations.gruumsh_temple_main_hall,
      ', where the party met the temple’s short high priest.',
    ],
  ],
})
