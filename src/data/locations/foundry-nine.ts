import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Foundry Nine',
  type: 'building',
  parent: refs.locations.world,
  at: [1085, 250],
  notes: [
    [
      'An abandoned dwarven war factory in the far east of the world. The region around it became a sanctuary for refugees of the Second Great War.',
    ],
  ],
  background: [
    [
      'Its name was invented by the DM, and its map position is a guess; the backstory of ',
      refs.pcs.auren,
      ' only places it in the far east.',
    ],
  ],
})
