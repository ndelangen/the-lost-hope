import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Trapdoor',
  icon: 'gi/GiWoodenDoor',
  type: 'building',
  parent: refs.locations.fajanet,
  at: [200, 400],
  notes: [['A trapdoor connected to the ', refs.locations.fajanet_tunnels, '.']],
  map: { url: '/assets/locations/the-trapdoor.png', width: 1200, height: 700 },
})
