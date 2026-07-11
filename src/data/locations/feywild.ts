import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Feywild',
  icon: 'gi/GiFairyWand',
  type: 'realm',
  parent: refs.locations.world,
  at: [0, 600],
  notes: [
    ['A realm containing the village toward which ', refs.npcs.crowy, ' is guiding the party.'],
  ],
})
