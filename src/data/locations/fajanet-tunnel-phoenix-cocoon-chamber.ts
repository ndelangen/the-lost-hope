import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Fajanet Tunnel Phoenix Cocoon Chamber',
  icon: 'gi/GiAlienEgg',
  type: 'dungeon',
  parent: refs.locations.fajanet_tunnels,
  at: [850, 400],
  notes: [['A deeper chamber in the ', refs.locations.fajanet_tunnels, '.']],
})
