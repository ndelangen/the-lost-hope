import { refs } from '#/data/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fajanet Tunnels',
  icon: 'gi/GiCaveEntrance',
  type: 'dungeon',
  parent: refs.locations.fajanet,
  at: [200, 0],
  notes: [['A network of underground tunnels, reached via ', refs.locations.trapdoor, '.']],
  map: { url: '/assets/locations/fajanet-tunnels.png', width: 1200, height: 700 },
})
