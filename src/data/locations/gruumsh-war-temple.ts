import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh War Temple',
  icon: 'gi/GiTempleDoor',
  type: 'building',
  parent: refs.locations.nimbus,
  at: [0, 0],
  notes: [
    [
      'A temple of the ',
      refs.organizations.church_of_gruumsh,
      ' on ',
      refs.locations.nimbus,
      '. Its worshippers value strength, conquest, struggle, and survival.',
    ],
    [
      'Its known rooms include the ',
      refs.locations.gruumsh_temple_main_hall,
      ', ',
      refs.locations.gruumsh_temple_ritual_room,
      ', ',
      refs.locations.gruumsh_temple_blood_hall,
      ', and ',
      refs.locations.gruumsh_temple_library,
      '. The complex also offers beds and baths.',
    ],
  ],
})
