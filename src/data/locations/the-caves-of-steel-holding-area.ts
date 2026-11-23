import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Caves of Steel Holding Area',
  icon: 'gi/GiAquarium',
  type: 'building',
  parent: refs.locations.the_caves_of_steel,
  at: [300, 450],
  notes: [
    [
      'Where the fleet keeps its sentient catch alive: creatures of the sea, penned in water and waiting.',
    ],
  ],
  background: [['They are kept for the table of ', refs.npcs.the_11th_marshal, '.']],
})
