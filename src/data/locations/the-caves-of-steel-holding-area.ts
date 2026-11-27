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
      'Holding rooms where the fleet keeps its sentient catch alive: creatures of the sea, caged in water and waiting.',
    ],
  ],
  background: [
    [
      'They are kept for the table of ',
      refs.npcs.the_11th_marshal,
      '. Large steel doors near the pool in the ',
      refs.locations.the_grand_hall,
      ' open onto tracks that carry the caged captives to the aboleth.',
    ],
  ],
})
