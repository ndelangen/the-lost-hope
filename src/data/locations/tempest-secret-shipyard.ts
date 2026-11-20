import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Tempest Secret Shipyard',
  icon: 'gi/GiCrane',
  type: 'district',
  parent: refs.locations.tempest,
  at: [700, 960],
  notes: [
    [
      'A hidden shipyard hanging from the underside of ',
      refs.locations.tempest,
      ', out of sight of the island above and of anyone who does not know to look below it.',
    ],
  ],
})
