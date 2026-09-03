import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fajanet Tunnel Phoenix Offshoot',
  icon: 'gi/GiStalactites',
  type: 'dungeon',
  parent: refs.locations.fajanet_tunnels,
  at: [350, 400],
  notes: [['A side passage in the ', refs.locations.fajanet_tunnels, '.']],
})
