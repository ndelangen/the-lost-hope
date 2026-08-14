import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Snowy Mountains',
  icon: 'lucide/MountainSnow',
  type: 'wilderness',
  parent: refs.locations.world,
  at: [580, 610],
  notes: [
    [
      'A mountain range on the route from ',
      refs.locations.verdant_haven,
      ' toward ',
      refs.locations.shadowpeak,
      '.',
    ],
  ],
})
