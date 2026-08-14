import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Trapdoor',
  icon: 'gi/GiFloorHatch',
  type: 'building',
  parent: refs.locations.fajanet,
  at: [690, 480],
  notes: [['A trapdoor connected to the ', refs.locations.fajanet_tunnels, '.']],
  map: { url: '/assets/locations/the-trapdoor.png', width: 1200, height: 700 },
})
