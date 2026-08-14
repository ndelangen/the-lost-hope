import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Shadow Realm Cave',
  icon: 'gi/GiUndergroundCave',
  type: 'dungeon',
  parent: refs.locations.shadow_realm,
  at: [0, 0],
  notes: [['A cave within the ', refs.locations.shadow_realm, '.']],
})
