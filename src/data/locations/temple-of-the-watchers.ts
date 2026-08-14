import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Temple of the Watchers',
  icon: 'gi/GiAllSeeingEye',
  type: 'building',
  parent: refs.locations.nimbus,
  at: [0, 0],
  notes: [
    [
      'A church on ',
      refs.locations.nimbus,
      ' associated with the Watchers. Its adherents were referred to as the Templars of the Watchers.',
    ],
  ],
})
