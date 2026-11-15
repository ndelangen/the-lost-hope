import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'The Briar Queen',
  type: 'route',
  parent: refs.locations.world,
  at: [925, 410],
  notes: [['The pirate ship of ', refs.npcs.captain_blackthorn, '.']],
})
