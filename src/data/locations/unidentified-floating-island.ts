import { refs } from '#/data/generated/refs.ts'
import { create as createLocation } from '#/definitions/location.ts'

export default createLocation({
  name: 'Unidentified Floating Island',
  icon: 'gi/GiFloatingPlatforms',
  type: 'landmark',
  parent: refs.locations.snowy_mountains,
  at: [725, 220],
  notes: [
    ['A mysterious island floating near the mountain peak; nobody in the party could identify it.'],
  ],
})
