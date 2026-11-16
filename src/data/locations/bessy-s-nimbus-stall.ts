import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Bessy’s Nimbus Stall',
  illustration: '/assets/locations/bessy-s-nimbus-stall-illustration.png',
  icon: 'gi/GiAnvil',
  type: 'landmark',
  parent: refs.locations.nimbus,
  at: [1060, 737],
  notes: [[refs.npcs.bessy, ' sells arms and armour here.']],
})
