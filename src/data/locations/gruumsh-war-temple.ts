import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Gruumsh War Temple',
  illustration: '/assets/locations/gruumsh-war-temple-illustration.png',
  icon: 'gi/GiTempleDoor',
  type: 'building',
  parent: refs.locations.skynet,
  at: [983, 481],
  map: { url: '/assets/maps/gruumsh-war-temple.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A temple of the ',
      refs.organizations.church_of_gruumsh,
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
