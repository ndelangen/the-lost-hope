import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Temple of the Watchers',
  illustration: '/assets/locations/temple-of-the-watchers-illustration.png',
  icon: 'gi/GiAllSeeingEye',
  type: 'building',
  parent: refs.locations.nimbus,
  at: [505, 746],
  map: { url: '/assets/maps/temple-of-the-watchers.jpg', width: 1536, height: 1024 },
  notes: [
    [
      'A church on ',
      refs.locations.nimbus,
      ' associated with the Watchers. Its adherents were referred to as the Templars of the Watchers.',
    ],
  ],
})
