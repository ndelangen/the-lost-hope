import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Giggles and Gadgets',
  icon: 'gi/GiGearHammer',
  aliases: ['Gadgets and Giggles'],
  type: 'building',
  parent: refs.locations.fairhaven,
  at: [0, 0],
  notes: [
    [
      'A shop selling all kinds of mechanisms, including flying brooms. Its name occasionally switches the order of its two title words.',
    ],
  ],
})
